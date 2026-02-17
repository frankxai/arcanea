#!/bin/bash

################################################################################
# Arcanea MVP - Deployment Verification Script
################################################################################
#
# This script verifies that a deployment is healthy and functioning correctly.
# Run this after deploying to production or preview environments.
#
# Usage:
#   ./scripts/verify-deployment.sh https://arcanea.ai
#   ./scripts/verify-deployment.sh https://preview-xyz.vercel.app
#
################################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DEPLOYMENT_URL="${1:-https://arcanea.ai}"
TIMEOUT=10
FAILURES=0

################################################################################
# Helper Functions
################################################################################

print_header() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
    FAILURES=$((FAILURES + 1))
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

check_url() {
    local url=$1
    local expected_status=${2:-200}
    local description=$3

    print_info "Checking: $description"
    print_info "URL: $url"

    local response
    response=$(curl -s -o /dev/null -w "%{http_code}|%{time_total}" --max-time $TIMEOUT "$url" 2>&1)

    local status_code
    local response_time
    status_code=$(echo "$response" | cut -d'|' -f1)
    response_time=$(echo "$response" | cut -d'|' -f2)

    if [ "$status_code" = "$expected_status" ]; then
        print_success "$description (${status_code}) - ${response_time}s"
        return 0
    else
        print_error "$description (Expected: ${expected_status}, Got: ${status_code})"
        return 1
    fi
}

check_json_endpoint() {
    local url=$1
    local description=$2

    print_info "Checking: $description"
    print_info "URL: $url"

    local response
    response=$(curl -s --max-time $TIMEOUT "$url" 2>&1)

    if echo "$response" | jq . >/dev/null 2>&1; then
        print_success "$description - Valid JSON"
        echo "$response" | jq . | head -5
        return 0
    else
        print_error "$description - Invalid JSON or request failed"
        echo "$response" | head -5
        return 1
    fi
}

################################################################################
# Main Verification Checks
################################################################################

main() {
    print_header "Arcanea MVP Deployment Verification"
    print_info "Target: $DEPLOYMENT_URL"
    print_info "Timeout: ${TIMEOUT}s per check"
    echo ""

    # 1. Check if site is reachable
    print_header "1. Basic Connectivity"
    check_url "$DEPLOYMENT_URL" 200 "Homepage"

    # 2. Check health endpoint
    print_header "2. Health Check"
    check_json_endpoint "$DEPLOYMENT_URL/api/health" "Health endpoint"

    # 3. Check static assets
    print_header "3. Static Assets"
    check_url "$DEPLOYMENT_URL/favicon.ico" 200 "Favicon"

    # 4. Check security headers
    print_header "4. Security Headers"
    print_info "Checking security headers..."

    local headers
    headers=$(curl -s -I "$DEPLOYMENT_URL" 2>&1)

    if echo "$headers" | grep -q "X-Frame-Options"; then
        print_success "X-Frame-Options header present"
    else
        print_warning "X-Frame-Options header missing"
    fi

    if echo "$headers" | grep -q "X-Content-Type-Options"; then
        print_success "X-Content-Type-Options header present"
    else
        print_warning "X-Content-Type-Options header missing"
    fi

    if echo "$headers" | grep -q "Strict-Transport-Security"; then
        print_success "Strict-Transport-Security header present"
    else
        print_warning "Strict-Transport-Security header missing"
    fi

    # 5. Check SSL/TLS
    print_header "5. SSL/TLS Configuration"
    if [[ "$DEPLOYMENT_URL" =~ ^https:// ]]; then
        print_info "Checking SSL certificate..."

        local ssl_info
        ssl_info=$(echo | openssl s_client -servername "${DEPLOYMENT_URL#https://}" -connect "${DEPLOYMENT_URL#https://}:443" 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)

        if [ $? -eq 0 ]; then
            print_success "SSL certificate valid"
            echo "$ssl_info"
        else
            print_error "SSL certificate check failed"
        fi
    else
        print_warning "Site not using HTTPS"
    fi

    # 6. Check response times
    print_header "6. Performance Check"
    print_info "Measuring response times..."

    local total_time=0
    local checks=3

    for i in $(seq 1 $checks); do
        local time
        time=$(curl -s -o /dev/null -w "%{time_total}" --max-time $TIMEOUT "$DEPLOYMENT_URL")
        total_time=$(echo "$total_time + $time" | bc)
        echo "  Request $i: ${time}s"
    done

    local avg_time
    avg_time=$(echo "scale=3; $total_time / $checks" | bc)

    if (( $(echo "$avg_time < 2.0" | bc -l) )); then
        print_success "Average response time: ${avg_time}s (Good)"
    elif (( $(echo "$avg_time < 5.0" | bc -l) )); then
        print_warning "Average response time: ${avg_time}s (Acceptable)"
    else
        print_error "Average response time: ${avg_time}s (Too slow)"
    fi

    # 7. Summary
    print_header "Verification Summary"

    if [ $FAILURES -eq 0 ]; then
        print_success "All checks passed! Deployment is healthy."
        echo ""
        exit 0
    else
        print_error "Deployment verification failed with $FAILURES error(s)."
        echo ""
        print_info "Next steps:"
        echo "  1. Check Vercel deployment logs: vercel logs $DEPLOYMENT_URL"
        echo "  2. Review application logs in Vercel dashboard"
        echo "  3. Verify environment variables are set correctly"
        echo "  4. Check Supabase project status"
        echo ""
        exit 1
    fi
}

################################################################################
# Script Entry Point
################################################################################

# Check dependencies
command -v curl >/dev/null 2>&1 || {
    print_error "curl is required but not installed. Aborting."
    exit 1
}

command -v jq >/dev/null 2>&1 || {
    print_warning "jq is not installed. JSON validation will be limited."
}

command -v bc >/dev/null 2>&1 || {
    print_warning "bc is not installed. Performance calculations will be skipped."
}

# Run main verification
main "$@"

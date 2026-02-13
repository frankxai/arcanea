import React from 'react';
import { motion } from 'framer-motion';
import { QuestionMarkCircleIcon, FireIcon, BeakerIcon, CubeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function ElementalAlignmentQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      element: 'fire',
      icon: FireIcon,
      color: 'from-red-500 to-orange-500',
      questions: [
        "You thrive in high-pressure situations where quick decisions matter",
        "Intense, impactful experiences energize you rather than drain you",
        "You prefer games that provide immediate, visceral feedback",
        "Competition brings out the best in your abilities",
        "You enjoy games that test your reflexes and reaction time"
      ]
    },
    {
      element: 'water',
      icon: BeakerIcon,
      color: 'from-blue-500 to-cyan-500',
      questions: [
        "Character stories and emotional connections are crucial to your enjoyment",
        "You prefer thoughtful, reflective gaming experiences",
        "Games that make you feel deeply are the most memorable",
        "You enjoy exploring complex character relationships and motivations",
        "Narrative resonance matters more than mechanical perfection"
      ]
    },
    {
      element: 'earth',
      icon: CubeIcon,
      color: 'from-green-500 to-emerald-500',
      questions: [
        "You love building and watching your creations grow over time",
        "Strategic depth and long-term planning excite you",
        "You value stability and predictable progression systems",
        "Complex systems that reward careful analysis appeal to you",
        "Building something that lasts provides deep satisfaction"
      ]
    },
    {
      element: 'wind',
      icon: SparklesIcon,
      color: 'from-purple-500 to-pink-500',
      questions: [
        "Creative expression and personal freedom are essential in games",
        "You enjoy social gaming and community interaction",
        "Player choice and consequence matter most to you",
        "You love sharing experiences and connecting with others",
        "Games that let you leave your personal mark are most rewarding"
      ]
    },
    {
      element: 'void',
      icon: QuestionMarkCircleIcon,
      color: 'from-gray-700 to-black',
      questions: [
        "You seek games that challenge your perceptions and assumptions",
        "Innovation and boundary-pushing experiences thrill you",
        "Mystery, discovery, and the unknown draw you in",
        "You enjoy games that make you question reality itself",
        "Transcendent experiences that expand your mind are most valuable"
      ]
    }
  ];

  const currentElement = questions[currentQuestion % questions.length];

  const handleAnswer = (value) => {
    const newAnswers = {
      ...answers,
      [currentElement.element]: [...(answers[currentElement.element] || []), value]
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length * 5 - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    const results = {};
    questions.forEach(section => {
      const sectionAnswers = answers[section.element] || [];
      const average = sectionAnswers.length > 0 
        ? sectionAnswers.reduce((a, b) => a + b, 0) / sectionAnswers.length 
        : 0;
      results[section.element] = Math.round(average * 20); // Convert to percentage
    });
    return results;
  };

  const results = calculateResults();

  if (showResults) {
    const dominantElement = Object.entries(results).reduce((a, b) => 
      results[a[0]] > results[b[0]] ? a : b
    )[0];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Your Elemental Alignment
            </h1>
            <p className="text-gray-300">Discover your Arcanean gaming essence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {questions.map((element) => {
              const Icon = element.icon;
              const percentage = results[element.element];
              const isDominant = element.element === dominantElement;
              
              return (
                <motion.div
                  key={element.element}
                  whileHover={{ scale: 1.05 }}
                  className={`relative overflow-hidden rounded-2xl p-6 ${
                    isDominant ? 'ring-2 ring-white ring-opacity-50' : ''
                  }`}
                  style={{
                    background: `linear-gradient(135deg, ${isDominant ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}, rgba(255,255,255,0.02))`
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${element.color} opacity-20`}></div>
                  <div className="relative z-10">
                    <Icon className="w-12 h-12 mb-4 text-white" />
                    <h3 className="text-xl font-bold capitalize mb-2">{element.element}</h3>
                    <div className="text-3xl font-bold mb-2">{percentage}%</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${element.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    {isDominant && (
                      <div className="mt-2 text-sm text-purple-300">Primary Essence</div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              Your Primary Guardian: <span className="capitalize">{dominantElement}</span>
            </h2>
            <p className="text-gray-300 mb-8">
              Based on your responses, you resonate most strongly with the {dominantElement} element. 
              Games and experiences aligned with this element will provide the most fulfilling gaming journey.
            </p>
            <button
              onClick={() => window.location.href = '/games'}
              className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Discover Your Games
            </button>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Discover Your Elemental Essence
          </h1>
          <p className="text-gray-300">
            Answer honestly to find games that resonate with your true nature
          </p>
        </motion.div>

        <motion.div
          key={currentQuestion}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8"
        >
          <div className="flex items-center mb-6">
            <currentElement.icon className="w-12 h-12 mr-4 text-white" />
            <div>
              <h2 className="text-2xl font-bold capitalize">{currentElement.element} Element</h2>
              <p className="text-gray-300">Question {Math.floor(currentQuestion / 5) + 1} of 5</p>
            </div>
          </div>

          <p className="text-xl mb-8 leading-relaxed">
            {currentElement.questions[Math.floor(currentQuestion / 5)]}
          </p>

          <div className="grid grid-cols-1 gap-4">
            {['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'].map((option, index) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(index / 4)}
                className={`p-4 rounded-xl text-left transition-all ${
                  index / 4 < 0.4 
                    ? 'bg-red-900 bg-opacity-30 hover:bg-opacity-50' 
                    : index / 4 < 0.8
                    ? 'bg-yellow-900 bg-opacity-30 hover:bg-opacity-50'
                    : 'bg-green-900 bg-opacity-30 hover:bg-opacity-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-4">
                    {index === 0 ? '😞' : index === 1 ? '😐' : index === 2 ? '😑' : index === 3 ? '😊' : '😍'}
                  </span>
                  <span className="text-lg">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Progress</span>
              <span className="text-sm text-gray-400">
                {currentQuestion + 1} / {questions.length * 5}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / (questions.length * 5)) * 100}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
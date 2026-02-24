# Elemental RPG Template ⚔️
## Water Element Narrative RPG - Unity + AI Storytelling

> *"Emotional character development with living, adaptive stories"*

### **Template Overview**
The Elemental RPG template creates deep, story-driven RPGs with emotional character development and adaptive narratives using Unity and the Leyla Emotional Storyteller system.

### **Core Features**
- **Dynamic Narrative**: Story that adapts to player choices and emotional state
- **Character Relationships**: Complex social systems with genuine personality AI
- **Emotional Combat**: Fighting that reveals character and advances story
- **Living World**: NPCs with their own lives, goals, and development
- **Meaningful Choices**: Every decision impacts relationships and narrative

### **Technology Stack**
```json
{
  "gameEngine": "Unity 2022.3",
  "narrativeSystem": "Leyla Emotional Storyteller",
  "aiIntegration": "TensorFlow Lite",
  "language": "C#",
  "deployment": "Multi-platform",
  "backend": "Node.js + MongoDB"
}
```

### **Quick Start**
```bash
# Clone template
git clone https://github.com/arcanea/elemental-rpg-template my-rpg

# Open in Unity
unity my-rpg

# Configure AI storytelling
cp config/storyteller-config.example.json config/storyteller-config.json

# Start development server
npm run dev
```

### **Project Structure**
```
my-rpg/
├── 🎮 Assets/
│   ├── Scripts/           # C# game scripts
│   │   ├── Narrative/       # Story and dialogue systems
│   │   ├── Characters/      # Character controllers and AI
│   │   ├── Combat/         # Emotional combat system
│   │   └── World/          # Environmental interactions
│   ├── Scenes/            # Game scenes
│   ├── Materials/         # Visual materials
│   └── Audio/            # Sound and music
├── 🧠 AI-Backend/         # Python AI services
│   ├── emotion_detector.py   # Player emotion analysis
│   ├── story_generator.py   # Dynamic narrative creation
│   └── character_ai.py     # NPC personality simulation
├── 📚 Story-Data/         # Narrative content
│   ├── characters/          # Character backgrounds and arcs
│   ├── dialogues/          # Conversation trees
│   └── plot_branches/      # Story paths and choices
└── ⚙️ Config/             # Game configuration
```

### **Core Systems**

#### **Emotional Character System**
```csharp
// Assets/Scripts/Characters/EmotionalCharacter.cs
using UnityEngine;
using System.Collections.Generic;

[CreateAssetMenu(menuName = "Emotional Character")]
public class EmotionalCharacter : ScriptableObject
{
    [Header("Core Identity")]
    public string characterName;
    public string backgroundStory;
    public Sprite characterPortrait;
    
    [Header("Emotional Profile")]
    [Range(0f, 1f)] public float openness = 0.5f;
    [Range(0f, 1f)] public float conscientiousness = 0.5f;
    [Range(0f, 1f)] public float extraversion = 0.5f;
    [Range(0f, 1f)] public float agreeableness = 0.5f;
    [Range(0f, 1f)] public float neuroticism = 0.5f;
    
    [Header("Current State")]
    [Range(-1f, 1f)] public float currentMood = 0f;
    [Range(0f, 100f)] public float stressLevel = 0f;
    [Range(0f, 100f)] public float trustInPlayer = 50f;
    
    [Header("Relationship Factors")]
    public List<CharacterRelationship> relationships;
    public List<EmotionalMemory> recentMemories;
    
    // Calculate emotional response to player action
    public EmotionalResponse CalculateResponse(PlayerAction action)
    {
        var impact = AnalyzeActionImpact(action);
        var moodShift = CalculateMoodShift(impact);
        var response = GenerateEmotionalDialogue(impact, moodShift);
        
        UpdateEmotionalState(moodShift);
        StoreEmotionalMemory(action, impact, response);
        
        return response;
    }
    
    private EmotionalImpact AnalyzeActionImpact(PlayerAction action)
    {
        var impact = new EmotionalImpact();
        
        switch (action.type)
        {
            case ActionType.Gift:
                impact.trust = action.value * 0.3f;
                impact.joy = action.value * 0.2f;
                impact.stress = -action.value * 0.1f;
                break;
                
            case ActionType.Betrayal:
                impact.trust = -action.value * 0.8f;
                impact.anger = action.value * 0.6f;
                impact.stress = action.value * 0.5f;
                break;
                
            case ActionType.Support:
                impact.gratitude = action.value * 0.4f;
                impact.trust = action.value * 0.2f;
                impact.stress = -action.value * 0.3f;
                break;
        }
        
        return impact;
    }
    
    private void UpdateEmotionalState(EmotionalImpact impact)
    {
        // Update mood based on emotional impact
        currentMood += impact.joy + impact.gratitude - impact.anger - impact.fear;
        currentMood = Mathf.Clamp(currentMood, -1f, 1f);
        
        // Update stress levels
        stressLevel += impact.stress;
        stressLevel = Mathf.Clamp(stressLevel, 0f, 100f);
        
        // Update trust in player
        trustInPlayer += impact.trust;
        trustInPlayer = Mathf.Clamp(trustInPlayer, 0f, 100f);
        
        // Stress affects mood
        if (stressLevel > 80f)
        {
            currentMood -= 0.1f;
        }
    }
    
    public string GenerateEmotionalDialogue(EmotionalImpact impact, float moodShift)
    {
        // Generate dialogue based on current emotional state
        var dialogueTemplate = SelectDialogueTemplate(currentMood, stressLevel);
        var personalizedDialogue = PersonalizeDialogue(dialogueTemplate, impact);
        
        return personalizedDialogue;
    }
}
```

#### **Adaptive Narrative Engine**
```csharp
// Assets/Scripts/Narrative/AdaptiveNarrativeEngine.cs
using UnityEngine;
using System.Collections.Generic;

public class AdaptiveNarrativeEngine : MonoBehaviour
{
    [Header("Narrative Configuration")]
    public TextAsset storyDatabase;
    public LeylaStorytellerAPI storytellerAPI;
    
    [Header("Current State")]
    public NarrativeState currentState;
    public List<StoryBranch> availableBranches;
    public Dictionary<string, float> emotionalWeights;
    
    private void Start()
    {
        InitializeNarrativeSystem();
        LoadCurrentStoryState();
    }
    
    private void InitializeNarrativeSystem()
    {
        storytellerAPI = new LeylaStorytellerAPI();
        storytellerAPI.InitializePlayerEmotionalProfile();
        
        emotionalWeights = new Dictionary<string, float>
        {
            {"wonder", 0.2f},
            {"hope", 0.3f},
            {"triumph", 0.2f},
            {"grief", 0.1f},
            {"love", 0.2f}
        };
    }
    
    public void ProcessPlayerChoice(ChoiceData choice)
    {
        // Analyze emotional impact of choice
        var emotionalImpact = storytellerAPI.AnalyzeChoiceEmotion(choice);
        
        // Update player emotional profile
        storytellerAPI.UpdatePlayerProfile(choice, emotionalImpact);
        
        // Calculate new story branches
        availableBranches = GenerateAvailableBranches(choice);
        
        // Adapt future story content
        AdaptNarrativeContent(emotionalImpact);
    }
    
    private List<StoryBranch> GenerateAvailableBranches(ChoiceData lastChoice)
    {
        var branches = new List<StoryBranch>();
        
        // Base branches from story database
        var baseBranches = storyDatabase.GetBranchesForChoice(lastChoice);
        
        // Filter and rank branches based on emotional state
        foreach (var branch in baseBranches)
        {
            var emotionalCompatibility = CalculateEmotionalCompatibility(branch);
            
            if (emotionalCompatibility > 0.3f) // Minimum compatibility threshold
            {
                branch.emotionalWeight = emotionalCompatibility;
                branches.Add(branch);
            }
        }
        
        // Sort by emotional weight and player preference
        branches.Sort((a, b) => b.emotionalWeight.CompareTo(a.emotionalWeight));
        
        return branches;
    }
    
    private float CalculateEmotionalCompatibility(StoryBranch branch)
    {
        var playerEmotion = storytellerAPI.GetCurrentEmotionalState();
        var compatibility = 0f;
        
        // Compare branch emotional content with player current state
        foreach (var emotion in branch.emotionalContent)
        {
            if (emotionalWeights.ContainsKey(emotion.type))
            {
                var desiredIntensity = emotionalWeights[emotion.type];
                var currentIntensity = playerEmotion.GetEmotion(emotion.type);
                var match = 1f - Mathf.Abs(desiredIntensity - currentIntensity);
                
                compatibility += match * emotion.importance;
            }
        }
        
        return compatibility;
    }
    
    private void AdaptNarrativeContent(EmotionalImpact impact)
    {
        // Adjust narrative pacing based on emotional state
        if (impact.stress > 0.5f)
        {
            // Reduce pacing during stressful moments
            currentState.narrativePacing *= 0.8f;
            currentState.emotionalIntensity += 0.2f;
        }
        else if (impact.joy > 0.5f)
        {
            // Increase pacing during joyful moments
            currentState.narrativePacing *= 1.1f;
            currentState.emotionalIntensity += 0.1f;
        }
        
        // Generate adaptive content
        GenerateEmotionalContent(impact);
    }
}
```

#### **Character AI with Emotional Depth**
```csharp
// Assets/Scripts/Characters/EmotionalAI.cs
using UnityEngine;
using System.Collections.Generic;

public class EmotionalAI : MonoBehaviour
{
    [Header("AI Configuration")]
    public EmotionalCharacter characterData;
    public float decisionInterval = 2f;
    
    [Header("Current State")]
    public AIState currentState;
    public List<CharacterMemory> memories;
    public Dictionary<string, float> emotionalWeights;
    
    private float lastDecisionTime;
    private Transform playerTransform;
    
    private void Start()
    {
        InitializeAI();
        playerTransform = GameObject.FindGameObjectWithTag("Player").transform;
    }
    
    private void Update()
    {
        if (Time.time - lastDecisionTime > decisionInterval)
        {
            MakeAIDecision();
            lastDecisionTime = Time.time;
        }
    }
    
    private void MakeAIDecision()
    {
        // Analyze current situation
        var situation = AnalyzeSituation();
        
        // Generate possible actions
        var possibleActions = GeneratePossibleActions(situation);
        
        // Evaluate actions based on personality
        var bestAction = EvaluateActions(possibleActions);
        
        // Execute action
        ExecuteAIAction(bestAction);
    }
    
    private SituationAnalysis AnalyzeSituation()
    {
        var analysis = new SituationAnalysis();
        
        // Distance to player
        var distanceToPlayer = Vector3.Distance(transform.position, playerTransform.position);
        analysis.playerProximity = 1f - (distanceToPlayer / 10f); // Normalize
        
        // Current time of day
        analysis.timeOfDay = GameManager.Instance.timeOfDay;
        
        // Recent interactions with player
        analysis.recentPlayerActions = GetRecentPlayerActions();
        
        // Current emotional state
        analysis.currentMood = characterData.currentMood;
        analysis.stressLevel = characterData.stressLevel;
        
        // Environmental factors
        analysis.environmentalFactors = AnalyzeEnvironment();
        
        return analysis;
    }
    
    private List<AIAction> GeneratePossibleActions(SituationAnalysis situation)
    {
        var actions = new List<AIAction>();
        
        // Social interactions
        if (situation.playerProximity > 0.5f)
        {
            actions.Add(new AIAction
            {
                type = AIActionType.Interact,
                priority = CalculateInteractionPriority(situation),
                emotionalImpact = CalculateInteractionEmotion(situation)
            });
        }
        
        // Emotional regulation
        if (situation.stressLevel > 70f)
        {
            actions.Add(new AIAction
            {
                type = AIActionType.SelfCare,
                priority = 0.8f,
                emotionalImpact = new EmotionalImpact { stress = -0.5f }
            });
        }
        
        // Goal-oriented behavior
        if (characterData.currentGoal != null)
        {
            actions.Add(new AIAction
            {
                type = AIActionType.PursueGoal,
                priority = 0.6f,
                emotionalImpact = new EmotionalImpact { purpose = 0.3f }
            });
        }
        
        return actions;
    }
    
    private AIAction EvaluateActions(List<AIAction> actions)
    {
        AIAction bestAction = null;
        float highestScore = -1f;
        
        foreach (var action in actions)
        {
            var score = EvaluateAction(action);
            if (score > highestScore)
            {
                highestScore = score;
                bestAction = action;
            }
        }
        
        return bestAction;
    }
    
    private float EvaluateAction(AIAction action)
    {
        var score = action.priority;
        
        // Modify score based on personality
        score += action.emotionalImpact.joy * characterData.extraversion;
        score += action.emotionalImpact.trust * characterData.agreeableness;
        score -= action.emotionalImpact.stress * (1f - characterData.neuroticism);
        
        // Modify score based on current mood
        if (characterData.currentMood > 0f && action.emotionalImpact.joy > 0f)
            score *= 1.2f; // Amplify positive actions when in good mood
            
        if (characterData.currentMood < 0f && action.emotionalImpact.anger < 0f)
            score *= 0.8f; // Reduce aggressive actions when in bad mood
        
        return score;
    }
}
```

### **AI Backend Integration**

#### **Emotion Detection Service**
```python
# AI-Backend/emotion_detector.py
import tensorflow as tf
import numpy as np
from typing import Dict, List

class EmotionDetector:
    def __init__(self):
        self.model = self.load_emotion_model()
        self.emotion_history = []
        
    def load_emotion_model(self):
        """Load pre-trained emotion detection model"""
        model_path = "models/emotion_detection_model.h5"
        return tf.keras.models.load_model(model_path)
    
    def analyze_player_behavior(self, behavior_data: Dict) -> Dict[str, float]:
        """Analyze player behavior to detect emotional state"""
        
        # Extract features from behavior
        features = self.extract_behavioral_features(behavior_data)
        
        # Predict emotions
        emotion_predictions = self.model.predict(np.array([features]))
        
        # Normalize and return emotion scores
        emotions = {
            'joy': float(emotion_predictions[0][0]),
            'anger': float(emotion_predictions[0][1]),
            'fear': float(emotion_predictions[0][2]),
            'surprise': float(emotion_predictions[0][3]),
            'sadness': float(emotion_predictions[0][4]),
            'neutral': float(emotion_predictions[0][5])
        }
        
        # Store for trend analysis
        self.emotion_history.append(emotions)
        if len(self.emotion_history) > 100:
            self.emotion_history.pop(0)
        
        return emotions
    
    def extract_behavioral_features(self, behavior_data: Dict) -> np.ndarray:
        """Extract numerical features from behavioral data"""
        
        features = []
        
        # Decision timing
        features.append(behavior_data.get('decision_time', 0))
        
        # Risk taking behavior
        features.append(behavior_data.get('risk_taking_score', 0))
        
        # Social interaction patterns
        features.append(behavior_data.get('social_engagement', 0))
        
        # Exploration vs. caution
        features.append(behavior_data.get('exploration_tendency', 0))
        
        # Recent choices
        features.extend(self.encode_recent_choices(behavior_data.get('recent_choices', [])))
        
        return np.array(features)
    
    def get_emotional_trend(self) -> Dict[str, float]:
        """Calculate emotional trend over time"""
        if len(self.emotion_history) < 10:
            return {}
        
        recent_emotions = self.emotion_history[-10:]
        trend = {}
        
        for emotion in ['joy', 'anger', 'fear', 'surprise', 'sadness']:
            values = [e[emotion] for e in recent_emotions]
            trend[emotion] = np.mean(values) - np.mean(values[:-5])  # Recent vs older
        
        return trend
```

#### **Story Generation Service**
```python
# AI-Backend/story_generator.py
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer
from typing import List, Dict

class StoryGenerator:
    def __init__(self):
        self.tokenizer = GPT2Tokenizer.from_pretrained('gpt2-medium')
        self.model = GPT2LMHeadModel.from_pretrained('gpt2-medium')
        self.emotional_prompts = self.load_emotional_prompts()
    
    def generate_adaptive_content(self, 
                              current_scene: Dict, 
                              player_emotion: Dict,
                              character_state: Dict) -> Dict[str, str]:
        """Generate story content adapted to current emotional state"""
        
        # Create emotional context prompt
        emotional_context = self.create_emotional_context(
            player_emotion, character_state
        )
        
        # Generate dialogue
        dialogue = self.generate_dialogue(current_scene, emotional_context)
        
        # Generate narrative description
        description = self.generate_description(current_scene, emotional_context)
        
        # Generate branch options
        choices = self.generate_choices(current_scene, emotional_context)
        
        return {
            'dialogue': dialogue,
            'description': description,
            'choices': choices
        }
    
    def create_emotional_context(self, 
                            player_emotion: Dict, 
                            character_state: Dict) -> str:
        """Create emotional context for story generation"""
        
        dominant_emotion = max(player_emotion, key=player_emotion.get)
        character_mood = character_state.get('current_mood', 'neutral')
        
        context = f"""
        Player Emotional State: {dominant_emotion} (intensity: {player_emotion[dominant_emotion]:.2f})
        Character Mood: {character_mood}
        Story Tone: {self.map_emotion_to_tone(dominant_emotion)}
        Narrative Pacing: {self.calculate_pacing(player_emotion)}
        """
        
        return context.strip()
    
    def generate_dialogue(self, scene: Dict, emotional_context: str) -> str:
        """Generate emotionally appropriate dialogue"""
        
        prompt = f"""
        Scene: {scene.get('description', '')}
        Character: {scene.get('character', '')}
        Emotional Context: {emotional_context}
        
        Generate emotionally resonant dialogue:
        """
        
        inputs = self.tokenizer.encode(prompt, return_tensors='pt')
        outputs = self.model.generate(
            inputs,
            max_length=150,
            num_return_sequences=1,
            temperature=0.8,
            pad_token_id=self.tokenizer.eos_token_id
        )
        
        dialogue = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return dialogue.replace(prompt, '').strip()
    
    def generate_choices(self, scene: Dict, emotional_context: str) -> List[str]:
        """Generate meaningful story choices"""
        
        # Choice templates based on emotional context
        if 'hope' in emotional_context or 'joy' in emotional_context:
            templates = [
                "Pursue the opportunity with optimism",
                "Share this moment with a companion",
                "Take time to reflect on this feeling"
            ]
        elif 'grief' in emotional_context or 'sadness' in emotional_context:
            templates = [
                "Seek comfort from a friend",
                "Withdraw to process these emotions",
                "Channel this feeling into purposeful action"
            ]
        else:
            templates = [
                "Investigate the situation carefully",
                "Consult with wisdom before acting",
                "Follow intuition and experience"
            ]
        
        # Generate personalized choices
        choices = []
        for template in templates:
            choice = self.personalize_choice(template, scene, emotional_context)
            choices.append(choice)
        
        return choices[:4]  # Return maximum 4 choices
```

### **Frontend Integration**

#### **Unity WebGL Build**
```csharp
// Assets/Scripts/Web/WebIntegration.cs
using UnityEngine;
using UnityEngine.SceneManagement;

public class WebIntegration : MonoBehaviour
{
    [Header("Web Configuration")]
    public string gameTitle = "Elemental RPG";
    public string gameDescription = "An emotional journey through elemental realms";
    
    private void Start()
    {
        // Initialize web integration
        if (Application.isWebPlayer)
        {
            InitializeWebFeatures();
        }
    }
    
    private void InitializeWebFeatures()
    {
        // Setup browser history and save sync
        SetupBrowserIntegration();
        
        // Setup analytics
        SetupAnalytics();
        
        // Setup social features
        SetupSocialFeatures();
    }
    
    public void SaveToCloud()
    {
        var saveData = new PlayerSaveData
        {
            playerStats = GameManager.Instance.playerStats,
            storyProgress = GameManager.Instance.storyProgress,
            emotionalProfile = GameManager.Instance.emotionalProfile,
            timestamp = System.DateTime.Now
        };
        
        // Send to cloud
        var jsonSave = JsonUtility.ToJson(saveData);
        Application.ExternalCall("saveGameData('" + jsonSave + "')");
    }
    
    public void LoadFromCloud()
    {
        // Request save data from browser/cloud
        Application.ExternalCall("loadGameData()");
    }
    
    public void ShareExperience()
    {
        // Share current emotional journey on social media
        var shareData = new ShareData
        {
            title = gameTitle,
            description = GetCurrentEmotionalStateDescription(),
            url = Application.absoluteURL
        };
        
        var jsonShare = JsonUtility.ToJson(shareData);
        Application.ExternalCall("shareExperience('" + jsonShare + "')");
    }
}
```

---

**💧 The Elemental RPG template creates deeply emotional, character-driven stories that resonate with players on profound levels.**

**Perfect for narrative games, character studies, and stories that explore the human condition through interactive storytelling.**
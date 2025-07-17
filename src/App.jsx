import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import MicIcon from '@mui/icons-material/Mic';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RefreshIcon from '@mui/icons-material/Refresh';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// Create a beautiful theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Indigo
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899', // Pink
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#1e293b',
    },
    h6: {
      fontWeight: 600,
      color: '#1e293b',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          border: '1px solid #e2e8f0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8,
        },
      },
    },
  },
});

// Persistent header component
function PersistentHeader() {
  const [userInfo, setUserInfo] = React.useState({ netId: '', username: '' });
  React.useEffect(() => {
    function updateUserInfo() {
      const saved = JSON.parse(localStorage.getItem('userInfo') || '{}');
      setUserInfo({ netId: saved.netId || '', username: saved.username || '' });
    }
    updateUserInfo();
    window.addEventListener('storage', updateUserInfo);
    window.addEventListener('userInfoUpdated', updateUserInfo);
    return () => {
      window.removeEventListener('storage', updateUserInfo);
      window.removeEventListener('userInfoUpdated', updateUserInfo);
    };
  }, []);
  if (!userInfo.netId && !userInfo.username) return null;
  return (
    <AppBar position="fixed" sx={{ background: 'linear-gradient(90deg, #6366f1 0%, #db2777 100%)', boxShadow: 'none', zIndex: 1201 }}>
      <Toolbar sx={{ justifyContent: 'flex-end' }}>
        <Chip
          label={`Logged in as: ${userInfo.netId}${userInfo.username ? ` (${userInfo.username})` : ''}`}
          color="primary"
          sx={{ fontWeight: 600, bgcolor: 'rgba(255,255,255,0.85)', color: '#1e293b', fontSize: '1rem' }}
        />
      </Toolbar>
    </AppBar>
  );
}

// User Info Page
function UserInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    netID: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear all previous data
    localStorage.clear();
    // Save new user info
    localStorage.setItem('userData', JSON.stringify(formData));
    localStorage.setItem('userInfo', JSON.stringify({ netId: formData.netID, username: formData.name }));
    navigate('/scenario-selection');
    window.dispatchEvent(new Event('userInfoUpdated'));
  };

  return (
    <Box sx={{ 
      width: '100vw',
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 4
    }}>
      <Box sx={{ width: '100%', maxWidth: 420, px: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ 
            color: 'white', 
            fontWeight: 700, 
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Voice Cloning Study
          </Typography>
          <Typography variant="h6" sx={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontWeight: 400 
          }}>
            Welcome! Please provide your information to begin.
          </Typography>
        </Box>
        <Card sx={{ 
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                margin="normal"
                required
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="NetID"
                value={formData.netID}
                onChange={(e) => setFormData({...formData, netID: e.target.value})}
                margin="normal"
                required
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={!formData.name || !formData.netID}
                sx={{ 
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  }
                }}
              >
                Continue
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

// Scenario Selection Page
function ScenarioSelection() {
  const navigate = useNavigate();
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const [recordings, setRecordings] = useState({});

  useEffect(() => {
    const savedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '{}');
    setRecordings(savedRecordings);
  }, []);

  const scenarios = [
    {
      id: 1,
      title: "Online Team Meeting",
      description: "Formal • Synchronous • Private",
      category: "Formal X Synchronous X Private",
      detailedDescription: "You're presenting a quarterly report to your team in a video conference. This is a professional setting where you need to sound confident, clear, and authoritative while discussing business metrics and project updates."
    },
    {
      id: 2,
      title: "Video Portfolio to Recruiter",
      description: "Formal • Asynchronous • Private",
      category: "Formal X Asynchronous X Private",
      detailedDescription: "You're recording a video introduction for a job application. This needs to be professional, engaging, and showcase your personality while maintaining a formal tone suitable for potential employers."
    },
    {
      id: 3,
      title: "Virtual Conference Presentation",
      description: "Formal • Synchronous • Public",
      category: "Formal X Synchronous X Public",
      detailedDescription: "You're giving a keynote speech at a virtual industry conference with hundreds of attendees. Your voice needs to be engaging, authoritative, and clear enough to maintain audience attention throughout a longer presentation."
    },
    {
      id: 4,
      title: "Fund-Raising Promotion",
      description: "Formal • Asynchronous • Public",
      category: "Formal X Asynchronous X Public",
      detailedDescription: "You're creating a promotional video for a fundraising campaign that will be shared on social media. This requires a persuasive, trustworthy tone that can inspire people to donate while maintaining professionalism."
    },
    {
      id: 5,
      title: "Online Game with Friends",
      description: "Informal • Synchronous • Private",
      category: "Informal X Synchronous X Private",
      detailedDescription: "You're playing an online multiplayer game with close friends and need to communicate strategies and reactions in real-time. This is casual, energetic, and full of natural expressions and emotions."
    },
    {
      id: 6,
      title: "Sending a Birthday Message",
      description: "Informal • Asynchronous • Private",
      category: "Informal X Asynchronous X Private",
      detailedDescription: "You're recording a heartfelt birthday message for a close friend or family member. This should be warm, personal, and emotionally expressive while maintaining authenticity and genuine care."
    },
    {
      id: 7,
      title: "Random Voice Chat",
      description: "Informal • Synchronous • Public",
      category: "Informal X Synchronous X Public",
      detailedDescription: "You're participating in a public voice chat room with strangers, sharing opinions and engaging in casual conversation. This requires being approachable, conversational, and comfortable with spontaneous interaction."
    },
    {
      id: 8,
      title: "Voice Profile on Dating App",
      description: "Informal • Asynchronous • Public",
      category: "Informal X Asynchronous X Public",
      detailedDescription: "You're recording a voice introduction for your dating app profile that will be heard by potential matches. This needs to be authentic, charming, and give a good sense of your personality while being appealing to a broad audience."
    }
  ];

  const handleScenarioToggle = (scenarioId) => {
    setSelectedScenarios(prev => {
      if (prev.includes(scenarioId)) {
        return prev.filter(id => id !== scenarioId);
      } else {
        return [...prev, scenarioId];
      }
    });
  };

  const handleContinue = () => {
    localStorage.setItem('selectedScenarios', JSON.stringify(selectedScenarios));
    if (selectedScenarios.length > 0) {
      navigate(`/scenario/${selectedScenarios[0]}/write`);
    }
  };

  return (
    <Box sx={{ 
      width: '100vw',
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Box sx={{ width: '100%', maxWidth: 900, px: 2, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ 
            color: 'white', 
            fontWeight: 700, 
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Select Scenarios
          </Typography>
          <Typography variant="h6" sx={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontWeight: 400 
          }}>
            Select one or more scenarios for voice synthesis.
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gap: 3, mb: 4, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
          {scenarios.map((scenario) => (
            <Card key={scenario.id} sx={{ 
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              border: selectedScenarios.includes(scenario.id) ? 3 : 1,
              borderColor: selectedScenarios.includes(scenario.id) ? '#6366f1' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 35px 60px -12px rgba(0,0,0,0.3)',
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>{scenario.title}</Typography>
                  {recordings[scenario.id] && (
                    <Chip icon={<CheckCircleIcon sx={{ color: '#22c55e' }} />} label="Recorded" size="small" color="success" />
                  )}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.5 }}>{scenario.detailedDescription}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, fontWeight: 500 }}>{scenario.category}</Typography>
                <FormControlLabel
                  control={<Checkbox checked={selectedScenarios.includes(scenario.id)} onChange={() => handleScenarioToggle(scenario.id)} sx={{ color: '#6366f1', '&.Mui-checked': { color: '#6366f1' } }} />}
                  label={selectedScenarios.includes(scenario.id) ? 'Selected' : 'Select'}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleContinue}
            disabled={selectedScenarios.length === 0}
            sx={{ 
              py: 2,
              px: 4,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
              },
              '&:disabled': {
                background: '#9ca3af',
              }
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// Combined Scenario Writing and Voice Recording Page
function ScenarioWritingAndRecording() {
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  const [scenarios, setScenarios] = useState([]);
  const [scenarioContent, setScenarioContent] = useState({});
  const [recordings, setRecordings] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatGPTPrompt, setChatGPTPrompt] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  
  const audioRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const allScenarios = [
    {
      id: 1,
      title: "Online Team Meeting",
      description: "Formal • Synchronous • Private",
      category: "Formal X Synchronous X Private"
    },
    {
      id: 2,
      title: "Video Portfolio to Recruiter",
      description: "Formal • Asynchronous • Private",
      category: "Formal X Asynchronous X Private"
    },
    {
      id: 3,
      title: "Virtual Conference Presentation",
      description: "Formal • Synchronous • Public",
      category: "Formal X Synchronous X Public"
    },
    {
      id: 4,
      title: "Fund-Raising Promotion",
      description: "Formal • Asynchronous • Public",
      category: "Formal X Asynchronous X Public"
    },
    {
      id: 5,
      title: "Online Game with Friends",
      description: "Informal • Synchronous • Private",
      category: "Informal X Synchronous X Private"
    },
    {
      id: 6,
      title: "Sending a Birthday Message",
      description: "Informal • Asynchronous • Private",
      category: "Informal X Asynchronous X Private"
    },
    {
      id: 7,
      title: "Random Voice Chat",
      description: "Informal • Synchronous • Public",
      category: "Informal X Synchronous X Public"
    },
    {
      id: 8,
      title: "Voice Profile on Dating App",
      description: "Informal • Asynchronous • Public",
      category: "Informal X Asynchronous X Public"
    }
  ];

  useEffect(() => {
    const selectedScenarioIds = JSON.parse(localStorage.getItem('selectedScenarios') || '[]');
    const selectedScenarios = allScenarios.filter(scenario => selectedScenarioIds.includes(scenario.id));
    setScenarios(selectedScenarios);
    const savedContent = JSON.parse(localStorage.getItem('scenarioContent') || '{}');
    setScenarioContent(savedContent);
    const savedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '{}');
    setRecordings(savedRecordings);
    setGeneratedScript('');
    setChatGPTPrompt('');
  }, []);

  useEffect(() => {
    setGeneratedScript('');
    setChatGPTPrompt('');
  }, [scenarioId]);

  const currentScenario = scenarios.find(s => s.id === parseInt(scenarioId));
  const currentContent = scenarioContent[parseInt(scenarioId)] || '';

  const generateChatGPTPrompt = (scenario) => {
    return `Write a brief, natural script for a voice recording in the following scenario:

Scenario: ${scenario.title}
Description: ${scenario.description}
Category: ${scenario.category}

The script should be:
- 2-3 sentences long
- Natural and conversational
- Appropriate for the scenario's formality level
- Easy to read aloud
- Specific to the context described

Please provide only the script text, no explanations.`;
  };

  const handleChatGPTDraft = async () => {
    if (!currentScenario || !chatGPTPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: chatGPTPrompt
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const draft = data.choices[0].message.content.trim();
      
      setGeneratedScript(draft);
      
      // Log ChatGPT usage
      const chatGPTUsage = JSON.parse(localStorage.getItem('chatGPTUsage') || '{}');
      if (!chatGPTUsage[currentScenario.id]) {
        chatGPTUsage[currentScenario.id] = {
          used: true,
          prompt: chatGPTPrompt,
          generatedScript: draft,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('chatGPTUsage', JSON.stringify(chatGPTUsage));
      }
    } catch (error) {
      console.error('Error generating draft:', error);
      alert('Failed to generate draft. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      let recorder;
      try {
        recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      } catch (e) {
        console.warn('audio/webm;codecs=opus not supported, falling back to audio/webm', e);
        recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      }
      setMediaRecorder(recorder);
      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType });
        console.log('Recorded blob:', blob);
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
      };
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone or starting MediaRecorder:', error);
      alert('Please allow microphone access to record your voice.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
    }
  };

  const playRecording = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopPlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const reRecord = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (audioBlob && currentContent.trim()) {
      // Save recording with enhanced metadata
      const savedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '{}');
      audioBlob.arrayBuffer().then(buffer => {
        const uint8Array = Array.from(new Uint8Array(buffer));
        savedRecordings[currentScenario.id] = {
          // Audio data
          blob: {
            type: audioBlob.type,
            data: uint8Array,
            size: audioBlob.size
          },
          url: audioUrl,
          
          // Metadata
          scenario: {
            id: currentScenario.id,
            title: currentScenario.title,
            description: currentScenario.description,
            category: currentScenario.category
          },
          script: currentContent,
          recordingDuration: recordingTime,
          timestamp: new Date().toISOString(),
          
          // ChatGPT usage info
          chatGPTUsed: !!generatedScript,
          chatGPTPrompt: chatGPTPrompt || null,
          generatedScript: generatedScript || null
        };
        localStorage.setItem('voiceRecordings', JSON.stringify(savedRecordings));
      });
      
      // Save script content
      const savedContent = JSON.parse(localStorage.getItem('scenarioContent') || '{}');
      savedContent[currentScenario.id] = currentContent;
      localStorage.setItem('scenarioContent', JSON.stringify(savedContent));
      
      // Navigate to individual scenario evaluation
      navigate(`/scenario/${currentScenario.id}/evaluation`);
    } else {
      alert('Please complete both the script and recording before continuing.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentScenario) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white' }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Box sx={{ width: '100%', maxWidth: 1600, px: { xs: 2, md: 6 }, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{
            color: 'white',
            fontWeight: 700,
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Write Script & Record Voice
          </Typography>
          <Typography variant="h6" sx={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400
          }}>
            Scenario {currentScenario.title}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4, width: '100%' }}>
          {/* Left Column - Script Writing */}
          <Box>
            <Card sx={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                  {currentScenario.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {currentScenario.description}
                </Typography>
                
                <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600, mb: 2 }}>
                  ChatGPT Prompt
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Write a prompt to guide ChatGPT in generating your script:
                </Typography>
                
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="e.g., 'Write a brief, natural script for a team meeting where I'm presenting quarterly results. Make it 2-3 sentences and professional.'"
                  variant="outlined"
                  sx={{ mb: 2 }}
                  value={chatGPTPrompt}
                  onChange={(e) => setChatGPTPrompt(e.target.value)}
                />
                
                <Button
                  variant="outlined"
                  onClick={handleChatGPTDraft}
                  disabled={isGenerating || !chatGPTPrompt.trim()}
                  startIcon={isGenerating ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                  sx={{ mb: 3 }}
                >
                  {isGenerating ? 'Generating...' : 'Generate Script with ChatGPT'}
                </Button>
                
                {generatedScript && (
                  <Box sx={{ mb: 3, p: 3, backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#6366f1', fontWeight: 600, mb: 1 }}>
                      Generated Script:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1e293b', fontStyle: 'italic', mb: 2 }}>
                      {generatedScript}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => setScenarioContent(prev => ({
                        ...prev,
                        [currentScenario.id]: generatedScript
                      }))}
                      sx={{ 
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                        }
                      }}
                    >
                      Use This Script
                    </Button>
                  </Box>
                )}
                
                <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600, mb: 2 }}>
                  Your Script
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Write or edit your script here (2-3 sentences recommended):
                </Typography>
                
                <TextField
                  multiline
                  rows={6}
                  fullWidth
                  value={currentContent}
                  onChange={(e) => setScenarioContent(prev => ({
                    ...prev,
                    [parseInt(scenarioId)]: e.target.value
                  }))}
                  placeholder="Write your script here or use the generated script above..."
                  variant="outlined"
                  sx={{ mb: 3 }}
                />
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - Voice Recording */}
          <Box>
            <Card sx={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600, mb: 3 }}>
                  Record Your Voice
                </Typography>
                
                {currentContent.trim() && (
                  <Box sx={{ mb: 3, p: 3, backgroundColor: 'rgba(99, 102, 241, 0.1)', borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ color: '#6366f1', fontWeight: 600, mb: 1 }}>
                      Script to Record:
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#1e293b', fontStyle: 'italic' }}>
                      {currentContent}
                    </Typography>
                  </Box>
                )}
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                  {!audioBlob ? (
                    <Button
                      variant="contained"
                      size="large"
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={!currentContent.trim()}
                      startIcon={isRecording ? <StopIcon /> : <MicIcon />}
                      sx={{ 
                        py: 2,
                        background: isRecording 
                          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        '&:hover': {
                          background: isRecording 
                            ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                            : 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                        },
                        '&:disabled': {
                          background: '#9ca3af',
                        }
                      }}
                    >
                      {isRecording ? `Stop Recording (${formatTime(recordingTime)})` : 'Start Recording'}
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        onClick={isPlaying ? stopPlaying : playRecording}
                        startIcon={isPlaying ? <StopIcon /> : <PlayArrowIcon />}
                        sx={{ py: 1.5 }}
                      >
                        {isPlaying ? 'Stop' : 'Play'} Recording
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={reRecord}
                        startIcon={<RefreshIcon />}
                        sx={{ py: 1.5 }}
                      >
                        Re-record
                      </Button>
                      <Button
                        variant="outlined"
                        component="a"
                        href={audioUrl}
                        download={`recording-${currentScenario?.id || 'unknown'}.webm`}
                        size="large"
                        sx={{ py: 2 }}
                      >
                        Download Recording
                      </Button>
                    </>
                  )}
                </Box>
                
                {!currentContent.trim() && (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                    Please write a script first before recording.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>

        {audioRef && (
          <audio
            ref={audioRef}
            src={audioUrl || ''}
            controls // Remove this line after debugging if you want to hide controls
            onEnded={handleAudioEnded}
            style={{ width: '100%', marginTop: 16 }}
          />
        )}

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleNext}
            disabled={!audioBlob || !currentContent.trim()}
            sx={{ 
              py: 2,
              px: 4,
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
              },
              '&:disabled': {
                background: '#9ca3af',
              }
            }}
          >
            {currentScenario.title}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// Scenario Writing Page
function ScenarioWriting() {
  const navigate = useNavigate();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const allScenarios = [
    {
      id: 1,
      title: "Online Team Meeting",
      description: "Formal • Synchronous • Private",
      category: "Formal X Synchronous X Private"
    },
    {
      id: 2,
      title: "Video Portfolio to Recruiter",
      description: "Formal • Asynchronous • Private",
      category: "Formal X Asynchronous X Private"
    },
    {
      id: 3,
      title: "Virtual Conference Presentation",
      description: "Formal • Synchronous • Public",
      category: "Formal X Synchronous X Public"
    },
    {
      id: 4,
      title: "Fund-Raising Promotion",
      description: "Formal • Asynchronous • Public",
      category: "Formal X Asynchronous X Public"
    },
    {
      id: 5,
      title: "Online Game with Friends",
      description: "Informal • Synchronous • Private",
      category: "Informal X Synchronous X Private"
    },
    {
      id: 6,
      title: "Sending a Birthday Message",
      description: "Informal • Asynchronous • Private",
      category: "Informal X Asynchronous X Private"
    },
    {
      id: 7,
      title: "Random Voice Chat",
      description: "Informal • Synchronous • Public",
      category: "Informal X Synchronous X Public"
    },
    {
      id: 8,
      title: "Voice Profile on Dating App",
      description: "Informal • Asynchronous • Public",
      category: "Informal X Asynchronous X Public"
    }
  ];

  useEffect(() => {
    const selectedScenarioIds = JSON.parse(localStorage.getItem('selectedScenarios') || '[]');
    const selectedScenarios = allScenarios.filter(scenario => selectedScenarioIds.includes(scenario.id));
    setScenarios(selectedScenarios);
  }, []);

  const currentScenario = scenarios[currentScenarioIndex];

  const generateChatGPTPrompt = (scenario) => {
    return `Create a 1-2 minute speech script for the following scenario: ${scenario.title} (${scenario.description}). 
    The script should be natural, conversational, and appropriate for the context. 
    Keep it between 150-300 words and make it engaging for the audience.`;
  };

  const handleChatGPTDraft = async () => {
    if (!currentScenario) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        // Fallback to mock response if no API key is set
        const mockResponse = `Here's a draft for your ${currentScenario.title} scenario:

Hello everyone, I'm excited to share some important updates with our team today. As we continue to work remotely, I want to emphasize how crucial our collaboration has been in maintaining our project momentum. We've made significant progress on our quarterly goals, and I'm particularly proud of how we've adapted to these new working conditions.

Our next steps include finalizing the client presentation by Friday and preparing for next week's stakeholder meeting. I encourage everyone to reach out if you need any clarification or support with your tasks. Remember, we're stronger when we work together, even virtually.

Let's keep up this great work and continue supporting each other. Thank you all for your dedication and flexibility during these challenging times.`;

        setContent(mockResponse);
        return;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant that creates natural, conversational speech scripts for various scenarios. Keep responses between 150-300 words and make them engaging and appropriate for the context.'
            },
            {
              role: 'user',
              content: generateChatGPTPrompt(currentScenario)
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content;
      setContent(generatedContent);
    } catch (err) {
      console.error('ChatGPT API error:', err);
      setError('Failed to generate draft. Please check your API key or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    // Save current content
    const savedContent = JSON.parse(localStorage.getItem('scenarioContent') || '{}');
    savedContent[currentScenario.id] = content;
    localStorage.setItem('scenarioContent', JSON.stringify(savedContent));

    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setContent('');
    } else {
      navigate('/recording');
    }
  };

  if (!currentScenario) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white' }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Box sx={{ width: '100%', maxWidth: 1600, px: { xs: 2, md: 6 }, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{
            color: 'white',
            fontWeight: 700,
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Write Your Content
          </Typography>
          <Typography variant="h6" sx={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400
          }}>
            Scenario {currentScenarioIndex + 1} of {scenarios.length}
          </Typography>
        </Box>
        
        <Card sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          mb: 4
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
              {currentScenario.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {currentScenario.description}
            </Typography>
            <Typography variant="body1">
              Write a 1-2 minute speech script for this scenario. You can use ChatGPT to help draft your content.
            </Typography>
          </CardContent>
        </Card>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Card sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          mb: 4
        }}>
          <CardContent sx={{ p: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={12}
              label="Your Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your speech content here..."
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleChatGPTDraft}
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : null}
                size="large"
                sx={{ py: 1.5, px: 3 }}
              >
                {isLoading ? 'Generating...' : 'Draft with ChatGPT'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleNext}
            disabled={!content.trim()}
            sx={{ 
              py: 2,
              px: 4,
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
              },
              '&:disabled': {
                background: '#9ca3af',
              }
            }}
          >
            {currentScenarioIndex < scenarios.length - 1 ? 'Next Scenario' : 'Continue to Recording'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// Voice Recording Page
function VoiceRecording() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [recordings, setRecordings] = useState({});
  const [scenarioScripts, setScenarioScripts] = useState({});
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  const allScenarios = [
    {
      id: 1,
      title: "Online Team Meeting",
      description: "Formal • Synchronous • Private",
      category: "Formal X Synchronous X Private"
    },
    {
      id: 2,
      title: "Video Portfolio to Recruiter",
      description: "Formal • Asynchronous • Private",
      category: "Formal X Asynchronous X Private"
    },
    {
      id: 3,
      title: "Virtual Conference Presentation",
      description: "Formal • Synchronous • Public",
      category: "Formal X Synchronous X Public"
    },
    {
      id: 4,
      title: "Fund-Raising Promotion",
      description: "Formal • Asynchronous • Public",
      category: "Formal X Asynchronous X Public"
    },
    {
      id: 5,
      title: "Online Game with Friends",
      description: "Informal • Synchronous • Private",
      category: "Informal X Synchronous X Private"
    },
    {
      id: 6,
      title: "Sending a Birthday Message",
      description: "Informal • Asynchronous • Private",
      category: "Informal X Asynchronous X Private"
    },
    {
      id: 7,
      title: "Random Voice Chat",
      description: "Informal • Synchronous • Public",
      category: "Informal X Synchronous X Public"
    },
    {
      id: 8,
      title: "Voice Profile on Dating App",
      description: "Informal • Asynchronous • Public",
      category: "Informal X Asynchronous X Public"
    }
  ];

  useEffect(() => {
    const selectedScenarioIds = JSON.parse(localStorage.getItem('selectedScenarios') || '[]');
    const selectedScenarios = allScenarios.filter(scenario => selectedScenarioIds.includes(scenario.id));
    setScenarios(selectedScenarios);
    
    const savedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '{}');
    setRecordings(savedRecordings);
    
    const savedScripts = JSON.parse(localStorage.getItem('scenarioContent') || '{}');
    setScenarioScripts(savedScripts);
  }, []);

  const currentScenario = scenarios[currentScenarioIndex];

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      let recorder;
      try {
        recorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      } catch (e) {
        console.warn('audio/webm;codecs=opus not supported, falling back to audio/webm', e);
        recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      }
      setMediaRecorder(recorder);
      const chunks = [];
      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType });
        console.log('Recorded blob:', blob);
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
      };
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone or starting MediaRecorder:', error);
      alert('Please allow microphone access to record your voice.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      setIsPlaying(true);
      audioRef.current.play();
    }
  };

  const stopPlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const reRecord = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (audioBlob) {
      // Save recording
      const savedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '{}');
      audioBlob.arrayBuffer().then(buffer => {
        const uint8Array = Array.from(new Uint8Array(buffer));
        savedRecordings[currentScenario.id] = {
          blob: {
            type: audioBlob.type,
            data: uint8Array
          },
          url: audioUrl,
          timestamp: new Date().toISOString(),
          script: scenarioScripts[currentScenario.id] || ''
        };
        localStorage.setItem('voiceRecordings', JSON.stringify(savedRecordings));
      });
      // Go to survey for this scenario
      navigate(`/individual-evaluation/${currentScenario.id}`);
      return;
    }
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setAudioBlob(null);
      setAudioUrl(null);
      setRecordingTime(0);
    } else {
      navigate('/system-evaluation');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentScenario) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white' }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Box sx={{ width: '100%', maxWidth: 1600, px: { xs: 2, md: 6 }, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{
            color: 'white',
            fontWeight: 700,
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Record Your Voice
          </Typography>
          <Typography variant="h6" sx={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400
          }}>
            Recording {currentScenarioIndex + 1} of {scenarios.length}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 4, width: '100%' }}>
          {/* Script Section */}
          <Card sx={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.95)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            height: 'fit-content'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                {currentScenario.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {currentScenario.description}
              </Typography>
              
              {scenarioScripts[currentScenario?.id] ? (
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, color: '#6366f1', fontWeight: 600 }}>
                    Your Script
                  </Typography>
                  <Box sx={{
                    p: 3,
                    bgcolor: '#f8fafc',
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    maxHeight: '400px',
                    overflowY: 'auto'
                  }}>
                    <Typography variant="body1" style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
                      {scenarioScripts[currentScenario.id]}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Alert severity="info">
                  No script found for this scenario. Please complete the writing step first.
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Recording Section */}
          <Card sx={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.95)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                Voice Recording
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Read your prepared content aloud. You can re-record as many times as needed.
              </Typography>

              {isRecording && (
                <Box sx={{
                  mb: 3,
                  p: 2,
                  bgcolor: '#fef2f2',
                  borderRadius: 2,
                  border: '2px solid #fecaca'
                }}>
                  <Typography variant="h4" color="error" sx={{ fontWeight: 700 }}>
                    Recording: {formatTime(recordingTime)}
                  </Typography>
                  <Typography variant="body2" color="error">
                    Speak clearly and naturally
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                {!isRecording && !audioBlob && (
                  <Button
                    variant="contained"
                    startIcon={<MicIcon />}
                    onClick={startRecording}
                    size="large"
                    sx={{
                      py: 2,
                      background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
                      }
                    }}
                  >
                    Start Recording
                  </Button>
                )}
                
                {isRecording && (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<StopIcon />}
                    onClick={stopRecording}
                    size="large"
                    sx={{ py: 2 }}
                  >
                    Stop Recording
                  </Button>
                )}
                
                {audioBlob && !isRecording && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={isPlaying ? <StopIcon /> : <PlayArrowIcon />}
                      onClick={isPlaying ? stopPlaying : playRecording}
                      size="large"
                      sx={{ py: 2 }}
                    >
                      {isPlaying ? 'Stop' : 'Play'} Recording
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={reRecord}
                      size="large"
                      sx={{ py: 2 }}
                    >
                      Re-record
                    </Button>
                    <Button
                      variant="outlined"
                      component="a"
                      href={audioUrl}
                      download={`recording-${currentScenario?.id || 'unknown'}.webm`}
                      size="large"
                      sx={{ py: 2 }}
                    >
                      Download Recording
                    </Button>
                  </Box>
                )}
              </Box>
              
              {audioUrl && (
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onEnded={handleAudioEnded}
                  style={{ display: 'none' }}
                />
              )}
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleNext}
            disabled={!audioBlob}
            sx={{
              py: 2,
              px: 4,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
              }
            }}
          >
            {currentScenarioIndex < scenarios.length - 1 ? 'Next Recording' : 'Continue to Evaluation'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// Voice Evaluation Page
function VoiceEvaluation() {
  const navigate = useNavigate();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [recordings, setRecordings] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  
  const audioRef = useRef(null);

  const allScenarios = [
    {
      id: 1,
      title: "Online Team Meeting",
      description: "Formal • Synchronous • Private",
      category: "Formal X Synchronous X Private"
    },
    {
      id: 2,
      title: "Video Portfolio to Recruiter",
      description: "Formal • Asynchronous • Private",
      category: "Formal X Asynchronous X Private"
    },
    {
      id: 3,
      title: "Virtual Conference Presentation",
      description: "Formal • Synchronous • Public",
      category: "Formal X Synchronous X Public"
    },
    {
      id: 4,
      title: "Fund-Raising Promotion",
      description: "Formal • Asynchronous • Public",
      category: "Formal X Asynchronous X Public"
    },
    {
      id: 5,
      title: "Online Game with Friends",
      description: "Informal • Synchronous • Private",
      category: "Informal X Synchronous X Private"
    },
    {
      id: 6,
      title: "Sending a Birthday Message",
      description: "Informal • Asynchronous • Private",
      category: "Informal X Asynchronous X Private"
    },
    {
      id: 7,
      title: "Random Voice Chat",
      description: "Informal • Synchronous • Public",
      category: "Informal X Synchronous X Public"
    },
    {
      id: 8,
      title: "Voice Profile on Dating App",
      description: "Informal • Asynchronous • Public",
      category: "Informal X Asynchronous X Public"
    }
  ];

  const surveyQuestions = [
    {
      id: 'naturalness',
      question: 'How natural did your voice sound?',
      scale: ['Very Unnatural', 'Unnatural', 'Neutral', 'Natural', 'Very Natural']
    },
    {
      id: 'expressiveness',
      question: 'How expressive was your voice?',
      scale: ['Not Expressive', 'Slightly Expressive', 'Moderately Expressive', 'Expressive', 'Very Expressive']
    },
    {
      id: 'clarity',
      question: 'How clear was your voice?',
      scale: ['Very Unclear', 'Unclear', 'Somewhat Clear', 'Clear', 'Very Clear']
    },
    {
      id: 'confidence',
      question: 'How confident did you sound?',
      scale: ['Not Confident', 'Slightly Confident', 'Moderately Confident', 'Confident', 'Very Confident']
    },
    {
      id: 'appropriateness',
      question: 'How appropriate was your voice for this scenario?',
      scale: ['Very Inappropriate', 'Inappropriate', 'Neutral', 'Appropriate', 'Very Appropriate']
    }
  ];

  useEffect(() => {
    const selectedScenarioIds = JSON.parse(localStorage.getItem('selectedScenarios') || '[]');
    const selectedScenarios = allScenarios.filter(scenario => selectedScenarioIds.includes(scenario.id));
    setScenarios(selectedScenarios);
    
    const savedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '{}');
    setRecordings(savedRecordings);
    
    // Load saved evaluations
    const savedEvaluations = JSON.parse(localStorage.getItem('voiceEvaluations') || '{}');
    setEvaluations(savedEvaluations);
  }, []);

  const currentScenario = scenarios[currentScenarioIndex];
  const currentRecording = recordings[currentScenario?.id];
  const audioUrl = currentRecording && currentRecording.url ? currentRecording.url : '';

  const playRecording = (scenarioId) => {
    const recording = recordings[scenarioId];
    if (recording && recording.url) {
      setCurrentPlayingId(scenarioId);
      setIsPlaying(true);
      audioRef.current.src = recording.url;
      audioRef.current.play();
    }
  };

  const stopPlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentPlayingId(null);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentPlayingId(null);
  };

  const handleEvaluationChange = (questionId, value) => {
    setEvaluations(prev => ({
      ...prev,
      [currentScenario.id]: {
        ...prev[currentScenario.id],
        [questionId]: value
      }
    }));
  };

  const handleNext = () => {
    // Save current evaluation
    const savedEvaluations = JSON.parse(localStorage.getItem('voiceEvaluations') || '{}');
    savedEvaluations[currentScenario.id] = evaluations[currentScenario.id];
    localStorage.setItem('voiceEvaluations', JSON.stringify(savedEvaluations));

    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      navigate('/customization');
    }
  };

  const isCurrentEvaluationComplete = () => {
    if (!currentScenario || !evaluations[currentScenario.id]) return false;
    return surveyQuestions.every(q => evaluations[currentScenario.id][q.id]);
  };

  if (!currentScenario) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white' }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Box sx={{ width: '100%', maxWidth: 1600, px: { xs: 2, md: 6 }, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{
            color: 'white',
            fontWeight: 700,
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Evaluate Your Voice Recording
          </Typography>
          <Typography variant="h6" sx={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400
          }}>
            Evaluation {currentScenarioIndex + 1} of {scenarios.length}
          </Typography>
        </Box>
        
        <Card sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          mb: 4
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
              {currentScenario.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {currentScenario.description}
            </Typography>
            
            {currentRecording && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={isPlaying && currentPlayingId === currentScenario.id ? <StopIcon /> : <PlayArrowIcon />}
                  onClick={isPlaying && currentPlayingId === currentScenario.id ? stopPlaying : () => playRecording(currentScenario.id)}
                  sx={{ py: 1.5 }}
                >
                  {isPlaying && currentPlayingId === currentScenario.id ? 'Stop' : 'Play'} Recording
                </Button>
                <Typography variant="body1" color="text.secondary">
                  Listen to your recording while answering the questions
                </Typography>
              </Box>
            )}
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
          {surveyQuestions.map((question) => (
            <Card key={question.id} sx={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend" sx={{ mb: 3, fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
                    {question.question}
                  </FormLabel>
                  <RadioGroup
                    row
                    value={evaluations[currentScenario.id]?.[question.id] || ''}
                    onChange={(e) => handleEvaluationChange(question.id, e.target.value)}
                  >
                    {question.scale.map((option, index) => {
                      const labelContent = (
                        <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                          <Typography variant="h6" display="block" sx={{ color: '#6366f1', fontWeight: 600 }}>
                            {index + 1}
                          </Typography>
                          <Typography variant="body2" display="block" color="text.secondary">
                            {option}
                          </Typography>
                        </Box>
                      );
                      return (
                        <FormControlLabel
                          key={index}
                          value={index.toString()}
                          control={<Radio sx={{ color: '#6366f1', '&.Mui-checked': { color: '#6366f1' } }} />}
                          label={labelContent}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          ))}
        </Box>

        {audioRef && (
          <audio
            ref={audioRef}
            src={audioUrl || ''}
            controls // Remove this line after debugging if you want to hide controls
            onEnded={handleAudioEnded}
            style={{ width: '100%', marginTop: 16 }}
          />
        )}

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleNext}
            disabled={!isCurrentEvaluationComplete()}
            sx={{
              py: 2,
              px: 4,
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
              },
              '&:disabled': {
                background: '#9ca3af',
              }
            }}
          >
            {currentScenarioIndex < scenarios.length - 1 ? 'Next Evaluation' : 'Continue to Customization'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// Voice Customization Page
function VoiceCustomization() {
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [scenarios, setScenarios] = useState([]);
  const [recordings, setRecordings] = useState({});
  const [customizations, setCustomizations] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  // Web Audio API state
  const [pitch, setPitch] = useState(0); // -12 to 12 semitones
  const [speed, setSpeed] = useState(1); // 0.5 to 2.0
  const [isPlayingCustomized, setIsPlayingCustomized] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const audioSourceRef = useRef(null);

  const allScenarios = [
    {
      id: 1,
      title: "Online Team Meeting",
      description: "Formal • Synchronous • Private",
      category: "Formal X Synchronous X Private"
    },
    {
      id: 2,
      title: "Video Portfolio to Recruiter",
      description: "Formal • Asynchronous • Private",
      category: "Formal X Asynchronous X Private"
    },
    {
      id: 3,
      title: "Virtual Conference Presentation",
      description: "Formal • Synchronous • Public",
      category: "Formal X Synchronous X Public"
    },
    {
      id: 4,
      title: "Fund-Raising Promotion",
      description: "Formal • Asynchronous • Public",
      category: "Formal X Asynchronous X Public"
    },
    {
      id: 5,
      title: "Online Game with Friends",
      description: "Informal • Synchronous • Private",
      category: "Informal X Synchronous X Private"
    },
    {
      id: 6,
      title: "Sending a Birthday Message",
      description: "Informal • Asynchronous • Private",
      category: "Informal X Asynchronous X Private"
    },
    {
      id: 7,
      title: "Random Voice Chat",
      description: "Informal • Synchronous • Public",
      category: "Informal X Synchronous X Public"
    },
    {
      id: 8,
      title: "Voice Profile on Dating App",
      description: "Informal • Asynchronous • Public",
      category: "Informal X Asynchronous X Public"
    }
  ];

  const currentScenario = scenarios[currentScenarioIndex];
  const currentRecording = recordings[currentScenario?.id];
  const audioUrl = currentRecording && currentRecording.url ? currentRecording.url : '';

  useEffect(() => {
    const selectedScenarioIds = JSON.parse(localStorage.getItem('selectedScenarios') || '[]');
    const selectedScenarios = allScenarios.filter(scenario => selectedScenarioIds.includes(scenario.id));
    setScenarios(selectedScenarios);
    
    const savedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '{}');
    setRecordings(savedRecordings);
  }, []);

  // Load audio buffer when current recording changes
  useEffect(() => {
    if (currentRecording && currentRecording.blob) {
      loadAudioBuffer(currentRecording.blob);
    }
  }, [currentRecording]);

  // Initialize Web Audio API
  const initializeAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  // Load audio buffer from blob
  const loadAudioBuffer = async (blob) => {
    try {
      initializeAudioContext();
      let realBlob = blob;
      
      // If blob is not a real Blob (e.g., from localStorage), reconstruct it
      if (!(blob instanceof Blob) && blob && blob.type && blob.data) {
        // Convert the array back to Uint8Array
        const uint8Array = new Uint8Array(blob.data);
        realBlob = new Blob([uint8Array], { type: blob.type });
      }
      
      const arrayBuffer = await realBlob.arrayBuffer();
      audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
      console.log('Audio buffer loaded:', audioBufferRef.current);
    } catch (error) {
      console.error('Error loading audio buffer:', error);
    }
  };

  // Play audio with pitch and speed modifications
  const playCustomizedAudio = async () => {
    if (!audioBufferRef.current || !audioContextRef.current) {
      console.warn('No audio buffer or context');
      return;
    }
    try {
      // Stop any currently playing audio
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }

      // Create new audio source
      audioSourceRef.current = audioContextRef.current.createBufferSource();
      audioSourceRef.current.buffer = audioBufferRef.current;

      // Create gain node for volume control
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.value = 0.7;

      // Create pitch shifter (using playback rate as approximation)
      const pitchRatio = Math.pow(2, pitch / 12);
      audioSourceRef.current.playbackRate.value = speed * pitchRatio;
      console.log('Playing customized audio with playbackRate:', speed * pitchRatio);

      // Connect nodes
      audioSourceRef.current.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      // Play audio
      audioSourceRef.current.start(0);
      setIsPlayingCustomized(true);

      // Handle end of audio
      audioSourceRef.current.onended = () => {
        setIsPlayingCustomized(false);
      };
    } catch (error) {
      console.error('Error playing customized audio:', error);
      setIsPlayingCustomized(false);
    }
  };

  const stopCustomizedAudio = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
    setIsPlayingCustomized(false);
  };

  const playRecording = (scenarioId) => {
    const recording = recordings[scenarioId];
    if (recording && recording.url) {
      setCurrentPlayingId(scenarioId);
      setIsPlaying(true);
      audioRef.current.src = recording.url;
      audioRef.current.play();
    }
  };

  const stopPlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentPlayingId(null);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentPlayingId(null);
  };

  const handleNext = () => {
    // Save current customization with enhanced metadata, merging with any existing customizedBlob
    const savedCustomizations = JSON.parse(localStorage.getItem('voiceCustomizations') || '{}');
    const prev = savedCustomizations[currentScenario.id] || {};
    savedCustomizations[currentScenario.id] = {
      ...prev,
      // Customization settings
      settings: {
        pitch: pitch,
        speed: speed
      },
      // Metadata
      scenario: {
        id: currentScenario.id,
        title: currentScenario.title,
        description: currentScenario.description,
        category: currentScenario.category
      },
      timestamp: new Date().toISOString(),
      // Customization metadata
      customizationType: 'pitch_and_speed',
      pitchRange: { min: -12, max: 12, step: 1 },
      speedRange: { min: 0.5, max: 2.0, step: 0.1 }
    };
    localStorage.setItem('voiceCustomizations', JSON.stringify(savedCustomizations));
    // Always go to revised evaluation for this scenario
    navigate(`/scenario/${scenarioId}/revised-evaluation`);
    // Immediately reload and update state
    const updatedCustomizations = JSON.parse(localStorage.getItem('voiceCustomizations') || '{}');
    setCustomizations(updatedCustomizations);
  };

  // Move saveCustomizedVoice here
  const saveCustomizedVoice = async () => {
    if (!audioBufferRef.current) {
      setSaveStatus('No audio loaded.');
      return;
    }
    try {
      // Create OfflineAudioContext for rendering
      const sampleRate = audioBufferRef.current.sampleRate;
      const length = audioBufferRef.current.length;
      const offlineCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(
        audioBufferRef.current.numberOfChannels,
        length,
        sampleRate
      );
      // Create buffer source
      const source = offlineCtx.createBufferSource();
      source.buffer = audioBufferRef.current;
      // Apply pitch and speed
      const pitchRatio = Math.pow(2, pitch / 12);
      source.playbackRate.value = speed * pitchRatio;
      // Connect to destination
      source.connect(offlineCtx.destination);
      source.start();
      // Render
      const renderedBuffer = await offlineCtx.startRendering();
      // Encode to WAV (simple PCM)
      const wavBlob = bufferToWavBlob(renderedBuffer);
      // Save to localStorage, merging with any existing settings/metadata
      const savedCustomizations = JSON.parse(localStorage.getItem('voiceCustomizations') || '{}');
      const prev = savedCustomizations[currentScenario.id] || {};
      savedCustomizations[currentScenario.id] = {
        ...prev,
        customizedBlob: {
          type: wavBlob.type,
          data: Array.from(new Uint8Array(await wavBlob.arrayBuffer())),
          size: wavBlob.size
        }
      };
      localStorage.setItem('voiceCustomizations', JSON.stringify(savedCustomizations));
      setSaveStatus('Customized voice saved!');
      // Immediately reload and update state
      const updatedCustomizations = JSON.parse(localStorage.getItem('voiceCustomizations') || '{}');
      setCustomizations(updatedCustomizations);
    } catch (err) {
      setSaveStatus('Failed to save customized voice.');
      console.error(err);
    }
  };

  // Helper: encode AudioBuffer to WAV Blob
  function bufferToWavBlob(buffer) {
    // Only supports mono/stereo, 16-bit PCM
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const samples = buffer.length * numChannels;
    const blockAlign = numChannels * bitDepth / 8;
    const byteRate = sampleRate * blockAlign;
    const dataLength = samples * bitDepth / 8;
    const bufferLength = 44 + dataLength;
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);
    // RIFF identifier
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(view, 8, 'WAVE');
    // fmt chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // Subchunk1Size
    view.setUint16(20, format, true); // AudioFormat
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    // data chunk
    writeString(view, 36, 'data');
    view.setUint32(40, dataLength, true);
    // Write PCM samples
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        let sample = buffer.getChannelData(ch)[i];
        sample = Math.max(-1, Math.min(1, sample));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }
    return new Blob([arrayBuffer], { type: 'audio/wav' });
  }
  function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  if (!currentScenario) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white' }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Box sx={{ width: '100%', maxWidth: 1600, px: { xs: 2, md: 6 }, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{
            color: 'white',
            fontWeight: 700,
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Customize Your Voice
          </Typography>
          <Typography variant="h6" sx={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400
          }}>
            Customization {currentScenarioIndex + 1} of {scenarios.length}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          {/* Left Column - Scenario Info and Recording */}
          <Box>
            <Card sx={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              mb: 3
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                  {currentScenario.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {currentScenario.description}
                </Typography>
                
                {currentRecording && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={isPlaying && currentPlayingId === currentScenario.id ? <StopIcon /> : <PlayArrowIcon />}
                      onClick={isPlaying && currentPlayingId === currentScenario.id ? stopPlaying : () => playRecording(currentScenario.id)}
                      sx={{ py: 1.5 }}
                    >
                      {isPlaying && currentPlayingId === currentScenario.id ? 'Stop' : 'Play'} Original
                    </Button>
                    <Typography variant="body2" color="text.secondary">
                      Listen to your original recording
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>

            {/* Customization Controls */}
            <Card sx={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600, mb: 3 }}>
                  Voice Customization
                </Typography>

                {/* Pitch Control */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                    Pitch: {pitch > 0 ? `+${pitch}` : pitch} semitones
                  </Typography>
                  <Slider
                    value={pitch}
                    onChange={(e, value) => setPitch(value)}
                    min={-12}
                    max={12}
                    step={1}
                    marks={[
                      { value: -12, label: '-12' },
                      { value: 0, label: '0' },
                      { value: 12, label: '+12' }
                    ]}
                    sx={{
                      color: '#6366f1',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#6366f1',
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#6366f1',
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#cbd5e1',
                      }
                    }}
                  />
                </Box>

                {/* Speed Control */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                    Speed: {speed.toFixed(1)}x
                  </Typography>
                  <Slider
                    value={speed}
                    onChange={(e, value) => setSpeed(value)}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    marks={[
                      { value: 0.5, label: '0.5x' },
                      { value: 1.0, label: '1.0x' },
                      { value: 2.0, label: '2.0x' }
                    ]}
                    sx={{
                      color: '#6366f1',
                      '& .MuiSlider-thumb': {
                        backgroundColor: '#6366f1',
                      },
                      '& .MuiSlider-track': {
                        backgroundColor: '#6366f1',
                      },
                      '& .MuiSlider-rail': {
                        backgroundColor: '#cbd5e1',
                      }
                    }}
                  />
                </Box>

                {/* Play Customized Button */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={isPlayingCustomized ? stopCustomizedAudio : playCustomizedAudio}
                  disabled={!currentRecording}
                  startIcon={isPlayingCustomized ? <StopIcon /> : <PlayArrowIcon />}
                  sx={{
                    py: 2,
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
                    },
                    '&:disabled': {
                      background: '#9ca3af',
                    }
                  }}
                >
                  {isPlayingCustomized ? 'Stop' : 'Play'} Customized
                </Button>

                {/* Save Customized Voice Button */}
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={saveCustomizedVoice}
                  disabled={!currentRecording}
                  sx={{ mt: 2 }}
                >
                  Save Customized Voice
                </Button>
                {saveStatus && (
                  <Typography variant="body2" color={saveStatus.includes('saved') ? 'success.main' : 'error.main'} sx={{ mt: 1 }}>
                    {saveStatus}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Box>

          {/* Right Column - All Scenarios */}
          <Box>
            <Card sx={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#1e293b', fontWeight: 600, mb: 3 }}>
                  All Scenarios
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {scenarios.map((scenario, index) => (
                    <Card
                      key={scenario.id}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        backgroundColor: currentScenario.id === scenario.id ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                        border: currentScenario.id === scenario.id ? '2px solid #6366f1' : '1px solid #e2e8f0',
                        '&:hover': {
                          backgroundColor: 'rgba(99, 102, 241, 0.05)',
                        }
                      }}
                      onClick={() => setCurrentScenarioIndex(index)}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1e293b' }}>
                            {scenario.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {scenario.description}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {recordings[scenario.id] && (
                            <CheckCircleIcon sx={{ color: '#10b981', fontSize: 20 }} />
                          )}
                          <Typography variant="body2" color="text.secondary">
                            {index + 1}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {audioRef && (
          <audio
            ref={audioRef}
            src={audioUrl || ''}
            controls // Remove this line after debugging if you want to hide controls
            onEnded={handleAudioEnded}
            style={{ width: '100%', marginTop: 16 }}
          />
        )}

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleNext}
            sx={{
              py: 2,
              px: 4,
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
              }
            }}
          >
            {currentScenarioIndex < scenarios.length - 1 ? 'Next Customization' : 'Continue to Evaluation'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// Revised Voice Evaluation Page
function RevisedVoiceEvaluation() {
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  const [scenarios, setScenarios] = useState([]);
  const [recordings, setRecordings] = useState({});
  const [customizations, setCustomizations] = useState({});
  const [evaluations, setEvaluations] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingId, setCurrentPlayingId] = useState(null);
  const [playingVersion, setPlayingVersion] = useState(null); // 'original' or 'customized'
  
  // Web Audio API state for customized playback
  const [isPlayingCustomized, setIsPlayingCustomized] = useState(false);
  
  const audioRef = useRef(null);
  const customizedAudioRef = useRef(null); // <-- add this
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const audioSourceRef = useRef(null);

  const allScenarios = [
    {
      id: 1,
      title: "Online Team Meeting",
      description: "Formal • Synchronous • Private",
      category: "Formal X Synchronous X Private"
    },
    {
      id: 2,
      title: "Video Portfolio to Recruiter",
      description: "Formal • Asynchronous • Private",
      category: "Formal X Asynchronous X Private"
    },
    {
      id: 3,
      title: "Virtual Conference Presentation",
      description: "Formal • Synchronous • Public",
      category: "Formal X Synchronous X Public"
    },
    {
      id: 4,
      title: "Fund-Raising Promotion",
      description: "Formal • Asynchronous • Public",
      category: "Formal X Asynchronous X Public"
    },
    {
      id: 5,
      title: "Online Game with Friends",
      description: "Informal • Synchronous • Private",
      category: "Informal X Synchronous X Private"
    },
    {
      id: 6,
      title: "Sending a Birthday Message",
      description: "Informal • Asynchronous • Private",
      category: "Informal X Asynchronous X Private"
    },
    {
      id: 7,
      title: "Random Voice Chat",
      description: "Informal • Synchronous • Public",
      category: "Informal X Synchronous X Public"
    },
    {
      id: 8,
      title: "Voice Profile on Dating App",
      description: "Informal • Asynchronous • Public",
      category: "Informal X Asynchronous X Public"
    }
  ];

  const surveyQuestions = [
    {
      id: 'preference',
      question: 'Which voice do you prefer?',
      scale: ['Strongly Prefer Original', 'Prefer Original', 'No Preference', 'Prefer Customized', 'Strongly Prefer Customized']
    },
    {
      id: 'personality_match',
      question: 'How well did the customized voice match your intended personality?',
      scale: ['Very Poor Match', 'Poor Match', 'Neutral', 'Good Match', 'Excellent Match']
    },
    {
      id: 'naturalness',
      question: 'How natural did the customized voice sound?',
      scale: ['Very Unnatural', 'Unnatural', 'Neutral', 'Natural', 'Very Natural']
    },
    {
      id: 'improvement',
      question: 'How much did the customization improve your voice for this scenario?',
      scale: ['Much Worse', 'Worse', 'No Change', 'Better', 'Much Better']
    },
    {
      id: 'appropriateness',
      question: 'How appropriate was the customized voice for this scenario?',
      scale: ['Very Inappropriate', 'Inappropriate', 'Neutral', 'Appropriate', 'Very Appropriate']
    }
  ];

  // Derive currentScenarioIndex and currentScenario from scenarios and scenarioId
  const currentScenarioIndex = scenarios.findIndex(s => s.id === parseInt(scenarioId));
  const currentScenario = scenarios[currentScenarioIndex];

  const currentRecording = recordings[currentScenario?.id];
  const currentCustomization = customizations[currentScenario?.id];
  const audioUrl = currentRecording && currentRecording.url ? currentRecording.url : '';

  useEffect(() => {
    const selectedScenarioIds = JSON.parse(localStorage.getItem('selectedScenarios') || '[]');
    const selectedScenarios = allScenarios.filter(scenario => selectedScenarioIds.includes(scenario.id));
    setScenarios(selectedScenarios);
    
    const savedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '{}');
    setRecordings(savedRecordings);
    
    const savedCustomizations = JSON.parse(localStorage.getItem('voiceCustomizations') || '{}');
    setCustomizations(savedCustomizations);
  }, []);

  // Initialize Web Audio API
  const initializeAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  // Load audio buffer from blob
  const loadAudioBuffer = async (blob) => {
    try {
      initializeAudioContext();
      let realBlob = blob;
      
      // If blob is not a real Blob (e.g., from localStorage), reconstruct it
      if (!(blob instanceof Blob) && blob && blob.type && blob.data) {
        // Convert the array back to Uint8Array
        const uint8Array = new Uint8Array(blob.data);
        realBlob = new Blob([uint8Array], { type: blob.type });
      }
      
      const arrayBuffer = await realBlob.arrayBuffer();
      audioBufferRef.current = await audioContextRef.current.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Error loading audio buffer:', error);
    }
  };

  // Play customized audio with saved pitch and speed settings
  const playCustomizedAudio = async () => {
    if (!audioBufferRef.current || !audioContextRef.current || !currentCustomization) return;

    try {
      // Stop any currently playing audio
      if (audioSourceRef.current) {
        audioSourceRef.current.stop();
      }

      // Create audio source
      audioSourceRef.current = audioContextRef.current.createBufferSource();
      audioSourceRef.current.buffer = audioBufferRef.current;

      // Create gain node for volume control
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.value = 1.0;

      // Apply saved pitch and speed modifications
      const savedPitch = currentCustomization.pitch || 0;
      const savedSpeed = currentCustomization.speed || 1.0;
      
      // Apply speed modification
      audioSourceRef.current.playbackRate.value = savedSpeed;

      // Connect nodes
      audioSourceRef.current.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);

      // Start playback
      audioSourceRef.current.start(0);
      setIsPlayingCustomized(true);
      setPlayingVersion('customized');

      // Handle playback end
      audioSourceRef.current.onended = () => {
        setIsPlayingCustomized(false);
        setPlayingVersion(null);
      };

    } catch (error) {
      console.error('Error playing customized audio:', error);
    }
  };

  const stopCustomizedAudio = () => {
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }
    setIsPlayingCustomized(false);
    setPlayingVersion(null);
  };

  // Load audio buffer when current recording changes
  useEffect(() => {
    if (currentRecording && currentRecording.blob && currentScenario) {
      loadAudioBuffer(currentRecording.blob);
    }
  }, [currentRecording, currentScenario]);

  const playOriginalRecording = () => {
    if (currentRecording && currentRecording.url) {
      setCurrentPlayingId(currentScenario.id);
      setPlayingVersion('original');
      setIsPlaying(true);
      audioRef.current.src = currentRecording.url;
      audioRef.current.play();
    }
  };

  const playCustomizedRecording = () => {
    if (currentCustomization && currentCustomization.customizedBlob) {
      const { type, data } = currentCustomization.customizedBlob;
      const blob = new Blob([new Uint8Array(data)], { type });
      const url = URL.createObjectURL(blob);
      customizedAudioRef.current.src = url;
      customizedAudioRef.current.play();
      setIsPlaying(true);
      setPlayingVersion('customized');
      // Clean up the URL after playback ends
      customizedAudioRef.current.onended = () => {
        URL.revokeObjectURL(url);
        setIsPlaying(false);
        setPlayingVersion(null);
      };
    } else {
      // Fallback: play with WebAudio if customizedBlob is missing (should not happen if user saved)
      playCustomizedAudio();
    }
  };

  const stopPlaying = () => {
    if (playingVersion === 'customized' && customizedAudioRef.current) {
      customizedAudioRef.current.pause();
      customizedAudioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentPlayingId(null);
      setPlayingVersion(null);
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentPlayingId(null);
      setPlayingVersion(null);
    }
    // Also stop customized audio if playing via WebAudio
    if (isPlayingCustomized) {
      stopCustomizedAudio();
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentPlayingId(null);
    setPlayingVersion(null);
  };

  const handleEvaluationChange = (questionId, value) => {
    setEvaluations(prev => ({
      ...prev,
      [currentScenario.id]: {
        ...prev[currentScenario.id],
        [questionId]: value
      }
    }));
  };

  const handleNext = () => {
    // Save current evaluation with enhanced metadata
    const savedEvaluations = JSON.parse(localStorage.getItem('revisedVoiceEvaluations') || '{}');
    savedEvaluations[currentScenario.id] = {
      // Evaluation responses
      responses: evaluations[currentScenario.id],
      
      // Metadata
      scenario: {
        id: currentScenario.id,
        title: currentScenario.title,
        description: currentScenario.description,
        category: currentScenario.category
      },
      timestamp: new Date().toISOString(),
      
      // Customization context
      customization: currentCustomization ? {
        pitch: currentCustomization.pitch,
        speed: currentCustomization.speed
      } : null,
      
      // Question metadata for analysis
      questions: surveyQuestions.map(q => ({
        id: q.id,
        question: q.question,
        scale: q.scale
      })),
      
      // Evaluation type
      evaluationType: 'revised_comparison'
    };
    localStorage.setItem('revisedVoiceEvaluations', JSON.stringify(savedEvaluations));
    if (currentScenarioIndex < scenarios.length - 1) {
      const nextScenario = scenarios[currentScenarioIndex + 1];
      navigate(`/scenario/${nextScenario.id}/write`);
    } else {
      navigate('/system-evaluation');
    }
  };

  const isCurrentEvaluationComplete = () => {
    if (!currentScenario || !evaluations[currentScenario.id]) return false;
    return surveyQuestions.every(q => evaluations[currentScenario.id][q.id]);
  };

  if (!currentScenario) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white' }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Box sx={{ width: '100%', maxWidth: 1600, px: { xs: 2, md: 6 }, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{
            color: 'white',
            fontWeight: 700,
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Compare Original vs. Customized Voice
          </Typography>
          <Typography variant="h6" sx={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400
          }}>
            Evaluation {currentScenarioIndex + 1} of {scenarios.length}
          </Typography>
        </Box>
        
        <Card sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          mb: 4
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
              {currentScenario.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {currentScenario.description}
            </Typography>
            
            {currentCustomization && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Your customization settings:
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Pitch: {(currentCustomization.settings ? currentCustomization.settings.pitch : currentCustomization.pitch) || 0} semitones • Speed: {(currentCustomization.settings ? currentCustomization.settings.speed : currentCustomization.speed) || 1.0}x
                </Typography>
                {(!currentCustomization.customizedBlob) && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    Customized voice not saved. Please return to the customization step and click "Save Customized Voice" to enable playback here.
                  </Typography>
                )}
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Voice Comparison Section */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mb: 4 }}>
          {/* Original Voice */}
          <Card sx={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.95)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                Original Voice
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Your original recording
              </Typography>
              
              <Button
                variant="outlined"
                fullWidth
                startIcon={isPlaying && playingVersion === 'original' ? <StopIcon /> : <PlayArrowIcon />}
                onClick={isPlaying && playingVersion === 'original' ? stopPlaying : playOriginalRecording}
                disabled={!currentRecording}
                size="large"
                sx={{ py: 2 }}
              >
                {isPlaying && playingVersion === 'original' ? 'Stop' : 'Play'} Original
              </Button>
            </CardContent>
          </Card>

          {/* Customized Voice */}
          <Card sx={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255,255,255,0.95)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
                Customized Voice
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Your voice with customizations applied
              </Typography>
              
              <Button
                variant="outlined"
                fullWidth
                startIcon={isPlaying && playingVersion === 'customized' ? <StopIcon /> : <PlayArrowIcon />}
                onClick={isPlaying && playingVersion === 'customized' ? stopPlaying : playCustomizedRecording}
                disabled={!currentRecording || (currentCustomization && !currentCustomization.customizedBlob)}
                size="large"
                sx={{ py: 2 }}
              >
                {isPlaying && playingVersion === 'customized' ? 'Stop' : 'Play'} Customized
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* Evaluation Questions */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3, color: 'white', textAlign: 'center' }}>
          Evaluation Questions
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
          {surveyQuestions.map((question) => (
            <Card key={question.id} sx={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend" sx={{ mb: 3, fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
                    {question.question}
                  </FormLabel>
                  <RadioGroup
                    row
                    value={evaluations[currentScenario.id]?.[question.id] || ''}
                    onChange={(e) => handleEvaluationChange(question.id, e.target.value)}
                  >
                    {question.scale.map((option, index) => {
                      const labelContent = (
                        <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                          <Typography variant="h6" display="block" sx={{ color: '#6366f1', fontWeight: 600 }}>
                            {index + 1}
                          </Typography>
                          <Typography variant="body2" display="block" color="text.secondary">
                            {option}
                          </Typography>
                        </Box>
                      );
                      return (
                        <FormControlLabel
                          key={index}
                          value={index.toString()}
                          control={<Radio sx={{ color: '#6366f1', '&.Mui-checked': { color: '#6366f1' } }} />}
                          label={labelContent}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          ))}
        </Box>

        {audioRef && (
          <audio
            ref={audioRef}
            src={audioUrl || ''}
            controls // Remove this line after debugging if you want to hide controls
            onEnded={handleAudioEnded}
            style={{ width: '100%', marginTop: 16 }}
          />
        )}

        {/* Add this audio element for customized playback */}
        <audio
          ref={customizedAudioRef}
          style={{ display: 'none' }}
          onEnded={handleAudioEnded}
        />

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleNext}
            disabled={!isCurrentEvaluationComplete()}
            sx={{
              py: 2,
              px: 4,
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
              },
              '&:disabled': {
                background: '#9ca3af',
              }
            }}
          >
            {currentScenarioIndex < scenarios.length - 1 ? 'Next Evaluation' : 'Continue to System Evaluation'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// System Evaluation Survey
function SystemEvaluation() {
  const navigate = useNavigate();
  const [evaluations, setEvaluations] = useState({});
  const [additionalComments, setAdditionalComments] = useState('');

  const surveyQuestions = [
    {
      id: 'ease_of_use',
      question: 'How easy was the system to use overall?',
      scale: ['Very Difficult', 'Difficult', 'Neutral', 'Easy', 'Very Easy']
    },
    {
      id: 'satisfaction',
      question: 'How satisfied are you with the overall experience?',
      scale: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied']
    },
    {
      id: 'usefulness',
      question: 'How useful would voice synthesis be in your daily life?',
      scale: ['Not Useful', 'Slightly Useful', 'Moderately Useful', 'Useful', 'Very Useful']
    },
    {
      id: 'intention_to_use',
      question: 'How likely are you to use voice synthesis technology in the future?',
      scale: ['Very Unlikely', 'Unlikely', 'Neutral', 'Likely', 'Very Likely']
    },
    {
      id: 'recommendation',
      question: 'How likely are you to recommend this system to others?',
      scale: ['Very Unlikely', 'Unlikely', 'Neutral', 'Likely', 'Very Likely']
    }
  ];

  const handleEvaluationChange = (questionId, value) => {
    setEvaluations(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = async () => {
    const selectedScenarios = JSON.parse(localStorage.getItem('selectedScenarios') || '[]');
    // Save system evaluation with enhanced metadata
    const systemEvaluation = {
      // Evaluation responses
      evaluations: evaluations,
      additionalComments: additionalComments,
      
      // Metadata
      timestamp: new Date().toISOString(),
      evaluationType: 'system_overall',
      
      // User and study context
      userData: JSON.parse(localStorage.getItem('userData') || '{}'),
      selectedScenarios: selectedScenarios,
      
      // Study data references
      scenarioContent: JSON.parse(localStorage.getItem('scenarioContent') || '{}'),
      voiceRecordings: JSON.parse(localStorage.getItem('voiceRecordings') || '{}'),
      individualEvaluations: JSON.parse(localStorage.getItem('individualEvaluations') || '{}'),
      voiceCustomizations: JSON.parse(localStorage.getItem('voiceCustomizations') || '{}'),
      revisedVoiceEvaluations: JSON.parse(localStorage.getItem('revisedVoiceEvaluations') || '{}'),
      chatGPTUsage: JSON.parse(localStorage.getItem('chatGPTUsage') || '{}'),
      
      // Question metadata for analysis
      questions: surveyQuestions.map(q => ({
        id: q.id,
        question: q.question,
        scale: q.scale
      })),
      
      // Study completion summary
      studySummary: {
        totalScenarios: selectedScenarios.length,
        scenariosCompleted: Object.keys(JSON.parse(localStorage.getItem('voiceRecordings') || '{}')).length,
        evaluationsCompleted: Object.keys(JSON.parse(localStorage.getItem('individualEvaluations') || '{}')).length,
        customizationsCompleted: Object.keys(JSON.parse(localStorage.getItem('voiceCustomizations') || '{}')).length,
        revisedEvaluationsCompleted: Object.keys(JSON.parse(localStorage.getItem('revisedVoiceEvaluations') || '{}')).length,
        chatGPTUsed: Object.keys(JSON.parse(localStorage.getItem('chatGPTUsage') || '{}')).length
      }
    };
    
    localStorage.setItem('systemEvaluation', JSON.stringify(systemEvaluation));
    
    // Show completion message
    alert('Thank you for participating in our voice cloning study! Your responses have been saved.');
    
    await handleExport();
    // In a real implementation, you might want to send this data to a server
    console.log('Complete study data:', systemEvaluation);
  };

  const isEvaluationComplete = () => {
    return surveyQuestions.every(q => evaluations[q.id]);
  };

  // Export user data and recordings as zip
  const handleExport = async () => {
    if (!window.confirm('Export all your data and recordings as a zip file?')) return;
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const netID = userData.netID || 'export';
    const zip = new JSZip();
    // Save responses as JSON
    const keys = [
      'userData',
      'selectedScenarios',
      'scenarioContent',
      'individualEvaluations',
      'voiceCustomizations',
      'revisedVoiceEvaluations',
      'systemEvaluation',
      'chatGPTUsage'
    ];
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        zip.file(`${netID}/${key}.json`, value);
      }
    });
    // Save voice recordings as .webm files
    const recordings = JSON.parse(localStorage.getItem('voiceRecordings') || '{}');
    for (const [scenarioId, rec] of Object.entries(recordings)) {
      if (rec.blob && rec.blob.data && rec.blob.type) {
        const uint8 = new Uint8Array(rec.blob.data);
        const blob = new Blob([uint8], { type: rec.blob.type });
        zip.file(`${netID}/voice_recording_scenario_${scenarioId}.webm`, blob);
      }
    }
    // Generate and download zip
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `${netID}.zip`);
  };

  return (
    <Box sx={{ 
      width: '100vw',
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Box sx={{ width: '100%', maxWidth: 900, px: 2, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ 
            color: 'white', 
            fontWeight: 700, 
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            System Evaluation
          </Typography>
          <Typography variant="h6" sx={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontWeight: 400 
          }}>
            Thank you for participating in our voice cloning study! Please provide your final feedback about the overall system experience.
          </Typography>
        </Box>
        <Card sx={{ 
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          mb: 4
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
              Study Summary
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              You have completed:
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              <Typography component="li" variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Selected scenarios for voice synthesis
              </Typography>
              <Typography component="li" variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Written content for each scenario (with optional ChatGPT assistance)
              </Typography>
              <Typography component="li" variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Recorded your voice for each scenario
              </Typography>
              <Typography component="li" variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Evaluated your original voice recordings
              </Typography>
              <Typography component="li" variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Customized voice pitch and speed settings
              </Typography>
              <Typography component="li" variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                Compared original vs. customized voices
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
          {surveyQuestions.map((question) => (
            <Card key={question.id} sx={{ 
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend" sx={{ mb: 3, fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
                    {question.question}
                  </FormLabel>
                  <RadioGroup
                    row
                    value={evaluations[question.id] || ''}
                    onChange={(e) => handleEvaluationChange(question.id, e.target.value)}
                  >
                    {question.scale.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={index.toString()}
                        control={<Radio sx={{ color: '#6366f1', '&.Mui-checked': { color: '#6366f1' } }} />}
                        label={
                          <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                            <Typography variant="h6" display="block" sx={{ color: '#6366f1', fontWeight: 600 }}>
                              {index + 1}
                            </Typography>
                            <Typography variant="body2" display="block" color="text.secondary">
                              {option}
                            </Typography>
                          </Box>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          ))}
        </Box>
        <Card sx={{ 
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          mb: 4
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
              Additional Comments
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Please share any additional thoughts, suggestions, or feedback about your experience with the voice synthesis system.
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="Share your thoughts here..."
              value={additionalComments}
              onChange={(e) => setAdditionalComments(e.target.value)}
            />
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleSubmit}
            sx={{
              py: 2,
              px: 5,
              fontWeight: 700,
              fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              boxShadow: '0 8px 24px 0 rgba(236,72,153,0.2)',
              borderRadius: 3,
              letterSpacing: 1,
              '&:hover': {
                background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
                boxShadow: '0 12px 32px 0 rgba(219,39,119,0.25)',
              },
              '&:disabled': {
                background: '#9ca3af',
              }
            }}
          >
            Finish Study
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// Individual Scenario Evaluation Component
function IndividualScenarioEvaluation() {
  const navigate = useNavigate();
  const { scenarioId } = useParams();
  const [evaluations, setEvaluations] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [scenarios, setScenarios] = useState([]);
  const [audioUrl, setAudioUrl] = useState('');
  const audioRef = useRef(null);

  // Derive currentScenario and currentScenarioIndex directly from scenarios and scenarioId
  const currentScenarioIndex = scenarios.findIndex(s => s.id === parseInt(scenarioId));
  const currentScenario = scenarios[currentScenarioIndex];

  const surveyQuestions = [
    {
      id: 'naturalness',
      question: 'How natural did your voice sound?',
      scale: ['Very Unnatural', 'Unnatural', 'Neutral', 'Natural', 'Very Natural']
    },
    {
      id: 'expressiveness',
      question: 'How expressive was your voice?',
      scale: ['Not Expressive', 'Slightly Expressive', 'Moderately Expressive', 'Expressive', 'Very Expressive']
    },
    {
      id: 'clarity',
      question: 'How clear was your voice?',
      scale: ['Very Unclear', 'Unclear', 'Somewhat Clear', 'Clear', 'Very Clear']
    },
    {
      id: 'confidence',
      question: 'How confident did you sound?',
      scale: ['Not Confident', 'Slightly Confident', 'Moderately Confident', 'Confident', 'Very Confident']
    },
    {
      id: 'appropriateness',
      question: 'How appropriate was your voice for this scenario?',
      scale: ['Very Inappropriate', 'Inappropriate', 'Neutral', 'Appropriate', 'Very Appropriate']
    }
  ];

  useEffect(() => {
    const selectedScenarioIds = JSON.parse(localStorage.getItem('selectedScenarios') || '[]');
    const allScenarios = [
      {
        id: 1,
        title: "Online Team Meeting",
        description: "Formal • Synchronous • Private",
        category: "Formal X Synchronous X Private"
      },
      {
        id: 2,
        title: "Video Portfolio to Recruiter",
        description: "Formal • Asynchronous • Private",
        category: "Formal X Asynchronous X Private"
      },
      {
        id: 3,
        title: "Virtual Conference Presentation",
        description: "Formal • Synchronous • Public",
        category: "Formal X Synchronous X Public"
      },
      {
        id: 4,
        title: "Fund-Raising Promotion",
        description: "Formal • Asynchronous • Public",
        category: "Formal X Asynchronous X Public"
      },
      {
        id: 5,
        title: "Online Game with Friends",
        description: "Informal • Synchronous • Private",
        category: "Informal X Synchronous X Private"
      },
      {
        id: 6,
        title: "Sending a Birthday Message",
        description: "Informal • Asynchronous • Private",
        category: "Informal X Asynchronous X Private"
      },
      {
        id: 7,
        title: "Random Voice Chat",
        description: "Informal • Synchronous • Public",
        category: "Informal X Synchronous X Public"
      },
      {
        id: 8,
        title: "Voice Profile on Dating App",
        description: "Informal • Asynchronous • Public",
        category: "Informal X Asynchronous X Public"
      }
    ];
    const selectedScenarios = allScenarios.filter(scenario => selectedScenarioIds.includes(scenario.id));
    setScenarios(selectedScenarios);
    // Load audio URL for this scenario
    const recordings = JSON.parse(localStorage.getItem('voiceRecordings') || '{}');
    const rec = recordings[scenarioId];
    setAudioUrl(rec && rec.url ? rec.url : '');
    // Load existing evaluations
    const savedEvaluations = JSON.parse(localStorage.getItem('individualEvaluations') || '{}');
    setEvaluations(savedEvaluations[scenarioId] || {});
  }, [scenarioId]);

  useEffect(() => {
    // Derive currentScenario from scenarios and scenarioId
    const currentScenario = scenarios.find(s => s.id === parseInt(scenarioId));
    if (currentScenario) {
      const savedRecordings = JSON.parse(localStorage.getItem('voiceRecordings') || '{}');
      const rec = savedRecordings[currentScenario.id];
      if (rec && rec.url) {
        setAudioUrl(rec.url);
      } else if (rec && rec.blob) {
        const blob = new Blob([new Uint8Array(rec.blob.data)], { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
      } else {
        setAudioUrl('');
      }
    }
  }, [scenarios, scenarioId]);

  const playRecording = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.src = audioUrl;
      audioRef.current.play().catch(e => console.error('Audio playback error:', e));
      setIsPlaying(true);
    }
  };

  const stopPlaying = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleEvaluationChange = (questionId, value) => {
    setEvaluations(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    // Save evaluations for this scenario with enhanced metadata
    const savedEvaluations = JSON.parse(localStorage.getItem('individualEvaluations') || '{}');
    savedEvaluations[scenarioId] = {
      // Evaluation responses
      responses: evaluations,
      // Metadata
      scenario: {
        id: currentScenario.id,
        title: currentScenario.title,
        description: currentScenario.description,
        category: currentScenario.category
      },
      timestamp: new Date().toISOString(),
      // Question metadata for analysis
      questions: surveyQuestions.map(q => ({
        id: q.id,
        question: q.question,
        scale: q.scale
      }))
    };
    localStorage.setItem('individualEvaluations', JSON.stringify(savedEvaluations));
    // Always go to customization for this scenario
    navigate(`/scenario/${scenarioId}/customization`);
  };

  const isEvaluationComplete = () => {
    return surveyQuestions.every(question => evaluations[question.id] !== undefined);
  };

  if (!currentScenario) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" sx={{ color: 'white' }}>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <Box sx={{ width: '100%', maxWidth: 900, px: 2, mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{
            color: 'white',
            fontWeight: 700,
            mb: 2,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Evaluate Your Recording
          </Typography>
          <Typography variant="h6" sx={{
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 400
          }}>
            Scenario {currentScenarioIndex + 1} of {scenarios.length}: {currentScenario.title}
          </Typography>
        </Box>

        <Card sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          mb: 4
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1e293b', fontWeight: 600 }}>
              Listen to Your Recording
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Review your voice recording for this scenario before evaluating it.
            </Typography>
            
            <Button
              variant="outlined"
              onClick={isPlaying ? stopPlaying : playRecording}
              startIcon={isPlaying ? <StopIcon /> : <PlayArrowIcon />}
              sx={{ mb: 3 }}
            >
              {isPlaying ? 'Stop' : 'Play'} Recording
            </Button>
            
            <audio
              ref={audioRef}
              src={audioUrl || undefined}
              controls
              style={{ width: '100%', marginTop: 16 }}
            />
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
          {surveyQuestions.map((question) => (
            <Card key={question.id} sx={{
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255,255,255,0.95)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
            }}>
              <CardContent sx={{ p: 4 }}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend" sx={{ mb: 3, fontSize: '1.1rem', fontWeight: 600, color: '#1e293b' }}>
                    {question.question}
                  </FormLabel>
                  <RadioGroup
                    row
                    value={evaluations[question.id] || ''}
                    onChange={(e) => handleEvaluationChange(question.id, e.target.value)}
                  >
                    {question.scale.map((option, index) => (
                      <FormControlLabel
                        key={index}
                        value={index.toString()}
                        control={<Radio sx={{ color: '#6366f1', '&.Mui-checked': { color: '#6366f1' } }} />}
                        label={
                          <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                            <Typography variant="h6" display="block" sx={{ color: '#6366f1', fontWeight: 600 }}>
                              {index + 1}
                            </Typography>
                            <Typography variant="body2" display="block" color="text.secondary">
                              {option}
                            </Typography>
                          </Box>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleNext}
            disabled={!isEvaluationComplete()}
            sx={{
              py: 2,
              px: 4,
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
              },
              '&:disabled': {
                background: '#9ca3af',
              }
            }}
          >
            {currentScenarioIndex < scenarios.length - 1 ? 'Next Scenario' : 'Continue to Voice Customization'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PersistentHeader />
      <Box sx={{ pt: 8 }}>
        <Routes>
          <Route path="/" element={<UserInfo />} />
          <Route path="/scenario-selection" element={<ScenarioSelection />} />
          <Route path="/scenario/:scenarioId/write" element={<ScenarioWritingAndRecording />} />
          <Route path="/scenario/:scenarioId/evaluation" element={<IndividualScenarioEvaluation />} />
          <Route path="/scenario/:scenarioId/customization" element={<VoiceCustomization />} />
          <Route path="/scenario/:scenarioId/revised-evaluation" element={<RevisedVoiceEvaluation />} />
          <Route path="/system-evaluation" element={<SystemEvaluation />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;

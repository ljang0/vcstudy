# Cartesia AI Voice Cloning Integration Setup

This app includes Cartesia AI voice cloning functionality for advanced speed and emotion controls. The app uses your recorded voice as the voice model for synthesis. Here's how to set it up:

## Prerequisites

1. Sign up for a Cartesia AI account at [https://cartesia.ai](https://cartesia.ai)
2. Get your API key from the Cartesia AI dashboard
3. Note your voice ID (you'll need this for the API calls)

## Setup Steps

### 1. Environment Variables

Create a `.env` file in your project root with your Cartesia AI API key:

```bash
REACT_APP_CARTESIA_API_KEY=your_cartesia_api_key_here
```

### 2. API Configuration

The current implementation uses a mock API endpoint. To use the real Cartesia AI API:

1. Replace the mock API call in `src/App.jsx` (around line 1480)
2. Update the endpoint to: `https://api.cartesia.ai/v1/audio/synthesize`
3. Replace `"VOICE_ID"` with your actual voice ID from Cartesia AI

The API request format follows the Cartesia AI voice cloning specification:

```json
{
  "text": "Your text here",
  "voice": {
    "mode": "clone",
    "audio": "base64_encoded_audio_data",
    "__experimental_controls": {
      "speed": "normal",
      "emotion": [
        "positivity:high",
        "curiosity"
      ]
    }
  }
}
```

**Note:** The app automatically converts your recorded audio to base64 format and sends it to Cartesia AI for voice cloning.

### 3. Features Available

The Cartesia AI integration provides:

#### Speed Control
**Preset Options:**
- **slowest**: Very slow speech
- **slow**: Slower than normal speech  
- **normal**: Default speech rate
- **fast**: Faster than normal speech
- **fastest**: Very fast speech

**Numeric Control:**
- Range: `-1.0` to `1.0`
- `0`: Default speed
- Negative values: Slow down speech
- Positive values: Speed up speech
- Example: `-0.5` = slower, `0.5` = faster

#### Emotion Control
Available emotions (all additive - they add to the voice):
- **anger**: Add anger to the voice
- **positivity**: Add positive emotion
- **surprise**: Add surprise/astonishment
- **sadness**: Add sadness/melancholy
- **curiosity**: Add inquisitive tone

**Emotion Levels:**
- **lowest**: Minimal emotion addition
- **low**: Small emotion addition
- **(no level)**: Moderate emotion addition
- **high**: Strong emotion addition
- **highest**: Maximum emotion addition

**Note:** Emotion controls are purely additive. For example, `anger:low` will add a small amount of anger to the voice, not make the voice less angry.

### 4. Usage

1. Complete the scenario writing step to create a script
2. Record your voice for the scenario
3. Go to the Voice Customization page
4. Use the Cartesia AI controls to adjust speed and emotions
5. Click "Clone Voice with Cartesia AI" to generate speech using your voice

### 5. API Reference

For detailed API documentation, visit: [https://docs.cartesia.ai/2024-11-13/build-with-cartesia/capability-guides/control-speed-and-emotion](https://docs.cartesia.ai/2024-11-13/build-with-cartesia/capability-guides/control-speed-and-emotion)

## Troubleshooting

- **API Key Issues**: Ensure your API key is correctly set in the `.env` file
- **Voice Cloning**: Make sure you have recorded audio available for voice cloning
- **CORS Issues**: You may need to set up a proxy server for local development
- **Recording Required**: The Cartesia AI voice cloning requires both a script and recorded audio
- **Audio Quality**: Higher quality recordings will result in better voice cloning results

## Mock Implementation

The current implementation includes a mock API call for demonstration purposes. Replace the mock implementation with actual Cartesia AI API calls for production use. 
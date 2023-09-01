document.addEventListener("DOMContentLoaded", () => {
  const textArea = document.getElementById("text");
  const voicesSelect = document.getElementById("voices");
  const speakButton = document.getElementById("speakBtn");
  // Get the attribute controls.
  const volumeInput = document.getElementById('volume');
  const rateInput = document.getElementById('rate');
  const pitchInput = document.getElementById('pitch');

  // Load voices
  const synth = window.speechSynthesis;
  let voices = [];

  const populateVoices = () => {
    voices = synth.getVoices();
    console.log(voices);
    voicesSelect.innerHTML = voices
      .map((voice, index) => `<option value="${index}">${voice.name}</option>`)
      .join("");
  };

  populateVoices();

  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoices;
  }

  // Speak text
  speakButton.addEventListener("click", () => {
    const selectedVoiceIndex = voicesSelect.value;
    const selectedVoice = voices[selectedVoiceIndex];

    if (selectedVoice && textArea.value.trim() !== "") {
      const utterance = new SpeechSynthesisUtterance(textArea.value);
      utterance.voice = selectedVoice;
      utterance.volume = parseFloat(volumeInput.value);
      utterance.rate = parseFloat(rateInput.value);
      utterance.pitch = parseFloat(pitchInput.value);
      window.speechSynthesis.cancel();
      synth.speak(utterance);
      let r = setInterval(() => {
        console.log(speechSynthesis.speaking);
        if (!speechSynthesis.speaking) {
          clearInterval(r);
        } else {
          speechSynthesis.resume();
        }
      }, 14000);
    }
  });
});

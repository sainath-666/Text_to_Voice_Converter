let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = "";
  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.voiceURI;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
  //   Set default voice
  if (voices.length > 0) {
    speech.voice = voices[0];
    voiceSelect.value = voices[0].voiceURI;
  }
}

populateVoices();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

voiceSelect.addEventListener("change", () => {
  const selectedVoice = voices.find((v) => v.voiceURI === voiceSelect.value);
  if (selectedVoice) {
    speech.voice = selectedVoice;
  }
});

document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  window.speechSynthesis.speak(speech);
});

document.getElementById("year").textContent = new Date().getFullYear();

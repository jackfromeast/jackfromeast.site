document.addEventListener('DOMContentLoaded', () => {
  const textElement = document.getElementById('headerTitle');
  const finalText = "JACKFROMEAST'S BLOG";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'><?/.,!@#$%^&*()_+-=";
  let iterations = 0;

  const animateText = () => {
    if (iterations < finalText.length) {
      let currentText = '';
      for (let i = 0; i < finalText.length; i++) {
        if (i < iterations) {
          currentText += finalText[i];
        } else {
          currentText += characters.charAt(Math.floor(Math.random() * characters.length));
        }
      }
      textElement.textContent = currentText;
      iterations++;
      setTimeout(animateText, 100);
    } else {
      textElement.textContent = finalText;
    }
  };

  animateText();
});
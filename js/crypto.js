document.addEventListener("DOMContentLoaded", function () {
  const userTextElem = document.querySelector(".container-content-text");
  const btnEncryptElem = document.querySelector(".container-content-btn-cripto");
  const btnDecryptElem = document.querySelector(".container-content-btn-descripto");
  const btnCopyElem = document.querySelector(".container-content-display-btn-copy");
  const resultElem = document.querySelector(".container-content-display-message-cripto");
  const displayNotFoundElem = document.querySelector(".container-content-display-not-found");
  const displayResponseElem = document.querySelector(".container-content-display-response");

  function cryptographyMessage(text) {
    const cryptoLaw = [
      ["e", "enter"],
      ["i", "imes"],
      ["a", "ai"],
      ["o", "ober"],
      ["u", "ufat"]
    ];

    for (let [original, substitute] of cryptoLaw) {
      text = text.replaceAll(original, substitute);
    }
    return text;
  }

  function decryptographyMessage(text) {
    const cryptoLaw = [
      ["a", "ai"],
      ["e", "enter"],
      ["i", "imes"],
      ["o", "ober"],
      ["u", "ufat"]
    ];

    for (let [original, encrypted] of cryptoLaw) {
      text = text.replaceAll(encrypted, original);
    }
    return text;
  }

  function toggleState(displayElement) {
    const elements = [displayNotFoundElem, displayResponseElem];
    elements.forEach(element => {
      element.style.display = element === displayElement ? "flex" : "none";
    });
  }

  function alternateText(text) {
    const textElement = document.querySelector(".container-content-display-response-text");
    if (textElement) {
      textElement.innerHTML = text;
    } else {
      console.error("Elemento de texto não encontrado");
    }
  }


  function btnEncrypt() {
    const userText = userTextElem.value.trim();
    if (userText === "") {
      toggleState(displayNotFoundElem);
    } else {
      const encryptedText = cryptographyMessage(userText);
      resultElem.value = encryptedText;
      toggleState(displayResponseElem);
      userTextElem.value = "";
      alternateText("Texto Criptografado");
    }
  }

  function btnDescrypt() {
    const encryptedText = userTextElem.value.trim();
    if (encryptedText === "") {
      toggleState(displayResponseElem);
    } else {
      const decryptedText = decryptographyMessage(encryptedText)
      resultElem.value = decryptedText;
      toggleState(displayResponseElem);
      alternateText("Texto Descriptografado");
    }
  }

  function copyEncryptedText() {
    resultElem.select();
    navigator.clipboard.writeText(resultElem.value);
    resultElem.value = userTextElem.value;
    alert('Texto criptografado copiado para a área de transferência.');
    userTextElem.value = resultElem.value;
    resultElem.value = "";
    window.location.reload();
  }

  btnEncryptElem.addEventListener("click", btnEncrypt);
  btnDecryptElem.addEventListener("click", btnDescrypt);
  btnCopyElem.addEventListener("click", copyEncryptedText)
});

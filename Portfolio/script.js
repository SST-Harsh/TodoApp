document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const userNameEl = document.querySelector(".name");
  const emailEl = document.querySelector(".email");
  const messageEl = document.querySelector(".message");
  const subjectEl = document.querySelector(".subject");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userNameValue = userNameEl.value.trim();
    const emailValue = emailEl.value.trim();
    const messageValue = messageEl.value.trim();
    const subjectValue = subjectEl.value.trim();

    if (userNameValue && emailValue && messageValue && subjectValue) {
      localStorage.setItem("name", userNameValue);
      localStorage.setItem("email", emailValue);
      localStorage.setItem("message", messageValue);
      localStorage.setItem("subject", subjectValue);

      alert("Form data saved to localStorage!");
    }
    else {
      alert("Please fill in all required fields.");
    }

    if (!userNameValue || !emailValue || !messageValue || !subjectValue) {
      setError("");
      alert("All Fields are Required !!")
    } else if (!emailValue.includes("@") || !emailValue.includes(".")) {
      setError(" Invalid email format.");
    }
  });
});

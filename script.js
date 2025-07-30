// Variable to hold the timeout instance
let typingTimeout;

/**
 * Creates a typewriter animation for the given text on an element.
 * @param {HTMLElement} element The HTML element to apply the effect to.
 * @param {string} text The text to display with the effect.
 */
function typewriterEffect(element, text) {
    let i = 0;
    element.textContent = "";
    // Add the 'typing' class to show the blinking cursor
    element.classList.add("typing");

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            // Store the timeout so it can be cleared later
            typingTimeout = setTimeout(type, 50); // Adjust speed here (e.g., 50ms)
        } else {
            // When typing is done, remove the cursor class
            element.classList.remove("typing");
        }
    }

    type();
}


function calculateAge() {
    // Stop any previous typewriter animation that might be running
    clearTimeout(typingTimeout);

    const dobValue = document.getElementById("dob").value;
    if (!dobValue) return;

    const dob = new Date(dobValue);
    const resultEl = document.getElementById("result");

    if (isNaN(dob.getTime())) {
        resultEl.textContent = "Please select a valid date.";
        return;
    }

    const now = new Date();

    if (dob > now) {
        typewriterEffect(resultEl, "You can't be born in the future!");
        return;
    }

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const resultString = `You are ${years} years, ${months} months, and ${days} days old.`;
    
    // Call the typewriter function with the result
    typewriterEffect(resultEl, resultString);
}
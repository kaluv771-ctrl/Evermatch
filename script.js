"use strict";

// Replace this with your official counselling WhatsApp number if needed.
const COUNSELLING_NUMBER = "2349162907325";
const marriageForm = document.getElementById("marriageForm");

document.getElementById("year").textContent = new Date().getFullYear();

function goToResponse(type, title, message, icon, contact = false) {
    const response = {
        type,
        title,
        message,
        icon,
        contact,
        timestamp: new Date().toISOString()
    };

    // Keep the result for this browser tab only; it is not sent to a server.
    sessionStorage.setItem("everMatchResponse", JSON.stringify(response));
    window.location.href = "response.html";
}

function getValidAge(value) {
    if (value.trim() === "") return null;
    const age = Number(value);
    if (!Number.isInteger(age) || age < 1 || age > 120) return null;
    return age;
}

marriageForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const ageInput = document.getElementById("age");
    const jobSecureInput = document.getElementById("job_secure");
    const physicalInput = document.getElementById("physical_desirability");

    const age = getValidAge(ageInput.value);
    const jobSecure = jobSecureInput.value.toLowerCase();
    const physicalWellbeing = physicalInput.value.toLowerCase();

    if (age === null) {
        goToResponse(
            "error",
            "Check your age",
            "Please enter a valid age in whole years, from 1 to 120.",
            "!"
        );
        return;
    }

    if (!jobSecure || !physicalWellbeing) {
        goToResponse(
            "error",
            "Complete the form",
            "Please answer every question before submitting your assessment.",
            "!"
        );
        return;
    }

    // Marriage applications should be limited to adults.
    if (age < 18) {
        goToResponse(
            "error",
            "Focus on your growth",
            "Please focus on your education, personal growth and well-being. Marriage should wait until adulthood, and you should never feel pressured to marry.",
            "♡"
        );
        return;
    }

    if (age > 40) {
        goToResponse(
            "guidance",
            "Additional guidance",
            "The original assessment rule recommends additional counselling for applicants above 40. Age alone does not determine your ability to build a successful relationship.",
            "♡",
            true
        );
        return;
    }

    if (jobSecure !== "yes") {
        goToResponse(
            "guidance",
            "Plan for stability",
            "The assessment recommends reflecting on your financial plans and support needs. Employment circumstances can change, and they do not determine your worth or ability to form a healthy relationship.",
            "♡",
            true
        );
        return;
    }

    if (physicalWellbeing !== "no") {
        goToResponse(
            "guidance",
            "Support and well-being",
            "If you have concerns about your physical well-being, consider speaking with a qualified healthcare professional. Your appearance or physical condition does not determine your worth or suitability for marriage.",
            "♡",
            true
        );
        return;
    }

    goToResponse(
        "success",
        "Assessment submitted successfully!",
        "You have completed this assessment and met its programmed conditions. This is not a guarantee of a match. Healthy relationships also depend on mutual consent, compatibility, communication and shared values.",
        "✓",
        true
    );
});

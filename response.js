 "use strict";

const icon = document.getElementById("responseIcon");
const label = document.getElementById("responseLabel");
const title = document.getElementById("responseTitle");
const message = document.getElementById("responseMessage");

const responseStyles = document.createElement("style");
responseStyles.textContent = `
.response-main {
    min-height: calc(100vh - 82px);
    display: grid;
    place-items: center;
    padding: 55px 20px 35px;
    background: linear-gradient(180deg, #fffaf5 0%, #f8f0ee 100%);
}
.response-card {
    width: min(100%, 620px);
    padding: clamp(28px, 6vw, 52px);
    background: #fff;
    border: 1px solid #f0e5e6;
    border-radius: 18px;
    box-shadow: 0 20px 70px rgba(75, 32, 48, 0.09);
    text-align: center;
}
.response-brand-mark {
    width: 72px;
    height: 72px;
    display: grid;
    place-items: center;
    margin: 0 auto 24px;
    border-radius: 50%;
    background: #f8e9ed;
    color: #8b2942;
    font-size: 34px;
    font-weight: 700;
}
.response-card.success .response-brand-mark {
    color: #24734b;
    background: #e4f4e9;
}
.response-card.error .response-brand-mark {
    color: #8b2942;
}
.response-card h1 {
    margin-top: 14px;
    font-family: "Playfair Display", serif;
    font-size: clamp(30px, 5vw, 43px);
    line-height: 1.2;
}
.response-card > p {
    max-width: 470px;
    margin: 17px auto 0;
    color: #82767c;
    font-size: 14px;
    line-height: 1.9;
    overflow-wrap: anywhere;
}
.response-actions {
    display: grid;
    gap: 15px;
    max-width: 330px;
    margin: 30px auto 0;
}
.response-primary {
    display: flex;
    text-align: left;
    text-decoration: none;
}
.response-home {
    color: #8b2942;
    font-size: 13px;
    font-weight: 700;
}
.response-whatsapp {
    display: inline-flex;
    justify-content: center;
    padding: 14px 18px;
    border-radius: 7px;
    background: #20874b;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
}
.response-privacy {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-top: 32px;
    padding: 14px;
    border-radius: 8px;
    background: #faf6f5;
    text-align: left;
}
.response-privacy span { color: #8b2942; }
.response-privacy p {
    color: #82767c;
    font-size: 11px;
    line-height: 1.8;
}
.response-footer {
    margin-top: 24px;
    color: #82767c;
    font-size: 12px;
    text-align: center;
}
@media (max-width: 760px) {
    .response-main { min-height: calc(100vh - 72px); }
}
`;
document.head.appendChild(responseStyles);

const saved = sessionStorage.getItem("everMatchResponse");

if (!saved) {
    label.textContent = "NO RECENT SUBMISSION";
    title.textContent = "No assessment response found";
    message.textContent = "Please return to the assessment page and submit the form to view your feedback.";
} else {
    try {
        const data = JSON.parse(saved);
        const card = document.querySelector(".response-card");
        card.classList.add(data.type || "guidance");
        icon.textContent = data.icon || "♡";
        label.textContent = data.type === "success"
            ? "ASSESSMENT COMPLETE"
            : data.type === "error"
                ? "PLEASE REVIEW"
                : "ASSESSMENT FEEDBACK";
        title.textContent = data.title || "Your assessment response";
        message.textContent = data.message || "Your assessment has been processed.";

        if (data.contact) {
            const link = document.createElement("a");
            link.className = "response-whatsapp";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.href = "https://wa.me/2349162907325?text=" +
                encodeURIComponent("Hello, I would like more information about the EverMatch marriage assessment.");
            link.textContent = "Contact Counselling on WhatsApp ↗";
            document.querySelector(".response-actions").prepend(link);
        }
    } catch (error) {
        sessionStorage.removeItem("everMatchResponse");
        label.textContent = "RESPONSE UNAVAILABLE";
        title.textContent = "We could not load your response";
        message.textContent = "Please return to the assessment page and submit the form again.";
    }
}

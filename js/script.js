const contactsList = document.getElementById("contactsList");
const searchInput = document.getElementById("search");
const newContactBtn = document.querySelector(".new-contact-btn");

// Store contacts locally
let contacts = [];

// Fetch contacts from API on load
async function fetchContacts() {
  try {
    const response = await fetch(
      "https://fake-json-api.mock.beeceptor.com/users"
    );
    const data = await response.json();
    contacts = data.map((c) => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      email: c.email,
      //   role: c.company?.catchPhrase || "No role",
      username: c.username,
      avatar: `https://i.pravatar.cc/50?u=${c.id}`,
    }));
    console.log("hai");
    console.log(contacts);
    renderContacts(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    contactsList.innerHTML = "<p>Failed to load contacts.</p>";
  }
}

// Render contact cards
function renderContacts(list) {
  contactsList.innerHTML = "";
  list.forEach((c) => {
    const card = document.createElement("div");
    card.className = "contact-card";
    card.innerHTML = `
      <img src="${c.avatar}" />
      <div class="contact-info">
        <p><strong>${c.name}</strong></p>
        <p>${c.phone}</p>
        <p>${c.email}</p>
      </div>
    `;
    card.addEventListener("click", () => showDetails(c));
    contactsList.appendChild(card);
  });
}

// Show details in panel
function showDetails(contact) {
  document.getElementById("detailName").innerText = contact.name;
  document.getElementById("detailRole").innerText = contact.role;
  document.getElementById("detailPhone").innerText = contact.phone;
  document.getElementById("detailEmail").innerText = contact.email;
  document.getElementById("detailChat").innerText = contact.username;
  document.querySelector(".details-panel img").src = contact.avatar;
}

// Search contacts
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.phone.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query)
  );
  renderContacts(filtered);
});

// Add new contact
newContactBtn.addEventListener("click", () => {
  const name = prompt("Enter name:");
  const phone = prompt("Enter phone:");
  const email = prompt("Enter email:");
  const role = prompt("Enter role:");
  if (!name || !phone || !email) return alert("All fields are required!");

  const newContact = {
    id: contacts.length + 1,
    name,
    phone,
    email,
    role: role || "No role",
    username: name.toLowerCase().replace(/\s+/g, ""),
    avatar: `https://i.pravatar.cc/50?u=${contacts.length + 1}`,
  };
  contacts.push(newContact);
  renderContacts(contacts);
});

fetchContacts();

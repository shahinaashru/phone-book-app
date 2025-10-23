const contactsList = document.getElementById("contactsList");
const searchInput = document.getElementById("search");
const newContactBtn = document.querySelector(".new-contact-btn");

// Store contacts locally
let contacts = [];
let selectedContact = document.getElementById("detailId").innerText;
// Fetch contacts from API on load
async function fetchContacts() {
  try {
    const response = await fetch(
      "https://fake-json-api.mock.beeceptor.com/users"
    );
    if (!response.ok) throw new Error("Network error: " + response.status);
    const data = await response.json();
    contacts = data.map((c) => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      email: c.email,
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
  console.log("hello");
  console.log(list);
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
  document.querySelector(
    ".details-panel img"
  ).src = `https://i.pravatar.cc/50?u=${contact.id}`;
  document.getElementById("detailName").innerText = contact.name;
  document.getElementById("detailId").innerText = contact.id;
  document.getElementById("detailPhone").innerText = contact.phone;
  document.getElementById("detailEmail").innerText = contact.email;
  selectedContact = document.getElementById("detailId").innerText;
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
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    alert("Invalid email format!");
    return;
  }
  if (!name || !phone || !email) return alert("All fields are required!");

  const newContact = {
    id: contacts.length + 1,
    name,
    phone,
    email,
    username: name.toLowerCase().replace(/\s+/g, ""),
    avatar: `https://i.pravatar.cc/50?u=${contacts.length + 1}`,
  };
  contacts.push(newContact);
  renderContacts(contacts);
});
document.querySelector(".delete").addEventListener("click", () => {
  if (!selectedContact) {
    alert("Please select a contact first!");
    return;
  }

  const confirmDelete = confirm(
    `Are you sure you want to delete ${selectedContact.name}?`
  );
  if (confirmDelete) {
    console.log(selectedContact);
    contacts = contacts.filter((c) => c.id != selectedContact);
    console.log("contacts");
    console.log(contacts);
    renderContacts(contacts);
    selectedContact = null;
    document.querySelector(".details-panel img").src =
      "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    document.getElementById("detailName").innerText = "Deleted";
    document.getElementById("detailPhone").innerText = "";
    document.getElementById("detailEmail").innerText = "";
    alert("Contact deleted successfully!");
  }
});

fetchContacts();

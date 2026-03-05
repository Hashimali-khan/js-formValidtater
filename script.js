let form = document.querySelector("form");
let username = document.querySelector("#name");
let roleInput = document.querySelector("#role");
let bio = document.querySelector("#bio");
let photo = document.querySelector("#photo");
let usersContainer = document.querySelector(".users");

const userManager = {
  users: [],

  init: function () {
    form.addEventListener("submit", this.submitForm.bind(this));
  },

  submitForm: function (e) {
    e.preventDefault();
    this.addUser();
  },

  addUser: function () {
    this.users.push({
      id: Date.now(), // unique id
      username: username.value,
      role: roleInput.value,
      bio: bio.value,
      photo: photo.value,
    });

    form.reset();
    this.renderUi();
  },

  renderUi: function () {
    usersContainer.innerHTML = "";

    this.users.forEach((user) => {
      const card = document.createElement("div");
      card.className =
        "bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100 hover:scale-105 transition";

      // Image
      const img = document.createElement("img");
      img.className =
        "w-28 h-28 rounded-full object-cover mb-5 border-4 border-blue-200 shadow";
      img.src = user.photo;
      img.alt = "User Photo";
      card.appendChild(img);

      // Name
      const name = document.createElement("h2");
      name.className = "text-2xl font-bold mb-1 text-blue-700";
      name.textContent = user.username;
      card.appendChild(name);

      // Role
      const role = document.createElement("p");
      role.className = "text-purple-500 mb-2 font-medium";
      role.textContent = user.role;
      card.appendChild(role);

      // Bio
      const desc = document.createElement("p");
      desc.className = "text-gray-700 text-center";
      desc.textContent = user.bio;
      card.appendChild(desc);

      // Remove Button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.className =
        "mt-4 text-red-500 font-semibold hover:underline";

      removeBtn.addEventListener("click", () => {
        this.removeUser(user.id);
      });

      card.appendChild(removeBtn);

      usersContainer.appendChild(card);
    });
  },

  removeUser: function (id) {
    this.users = this.users.filter((user) => user.id !== id);
    this.renderUi();
  },
};

userManager.init();

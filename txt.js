let btnPort = document.querySelector(".head img");
let subMenu = document.querySelector(".sub-menu-wrap");

btnPort.addEventListener("click", () => {
  subMenu.classList.toggle("open-menu");
});

let form = document.querySelector(".form");
let login = document.querySelector(".log");
let sign = document.querySelector(".sign");
let btnLogin = document.querySelector(".form .log button");
let loginUser = document.getElementById("username");
let loginPass = document.getElementById("my-passsss");
let btnSign = document.querySelector(".form .sign button");
let crAc = document.querySelectorAll(".crAc");
let signUser = document.querySelector(".sign-u");
let signPass = document.querySelector(".sign-p");
let btnLogout = document.querySelectorAll(".m-js");
let userName = document.querySelector(".user-info h2");
let userImg = document.querySelector(".user-info div");
let btnImg = document.querySelectorAll(`input[type="file"]`);

if (localStorage.getItem("img")) {
  if (localStorage.getItem("img")) {
    document.querySelector("#display-img").style.backgroundImage =
      localStorage.getItem("img");
  }
} else {
  document.querySelector(
    "#display-img"
  ).style.backgroundImage = `url("imgs/user.png")`;
}

btnImg.forEach((ele) => {
  ele.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      upload_img = reader.result;
      document.querySelector(
        "#display-img"
      ).style.backgroundImage = `url(${upload_img})`;
      window.localStorage.setItem("img", `url(${upload_img})`);
    });
    reader.readAsDataURL(this.files[0]);
  });
});

btnLogout.forEach((ele) => {
  ele.addEventListener("click", () => {
    localStorage.removeItem("logIn");
    sidebar.classList.add("fb-50");
    content.classList.add("fb-50");
    form.style.display = "block";
    localStorage.removeItem("img");
  });
});

if (localStorage.getItem("logIn")) {
  sidebar.classList.remove("fb-50");
  content.classList.remove("fb-50");
  form.style.display = "none";
  userName.innerHTML = localStorage.getItem("signU");
}
btnLogin.addEventListener("click", () => {
  if (
    loginUser.value == localStorage.getItem("signU") &&
    loginPass.value == localStorage.getItem("signP")
  ) {
    sidebar.classList.remove("fb-50");
    content.classList.remove("fb-50");
    form.style.display = "none";
    userName.innerHTML = loginUser.value;
    localStorage.setItem("logIn", true);
  }
});

btnSign.addEventListener("click", () => {
  if (signUser.value && signPass.value) {
    localStorage.setItem("signU", signUser.value);
    localStorage.setItem("signP", signPass.value);
  }
});

crAc.forEach((ele) => {
  ele.addEventListener("click", () => {
    login.classList.toggle("op-0");
    sign.classList.toggle("op-0");
  });
});

// التحميل المسبق للذكاء الإصطناعي
const modelPromise = GPT.load();

// تعريف الدالة التي تستخدم في توليد الرد
const generateResponse = async (input) => {
  // الانتظار لتحميل الذكاء الإصطناعي
  await modelPromise;

  // استخدام الذكاء الإصطناعي لتوليد الرد
  const response = await GPT.generate(input, {
    maxTokens: 128,
    temperature: 0.5,
  });

  // إرجاع الرد المولد
  return response;
};

// تعريف الدالة التي تستخدم في عرض الرد المولد
const displayResponse = (response) => {
  // إضافة الرد المولد إلى الدردشة
  const chatbox = document.querySelector("#chatbox");
  chatbox.innerHTML += `<div class="chatbot-response">${response}</div>`;
};

// تعريف الدالة التي تستخدم في إرسال الرسالة المدخلة من المستخدم
const sendMessage = async () => {
  // الحصول على الرسالة المدخلة من المستخدم
  const input = document.querySelector("#input").value;

  // عرض الرسالة المدخلة من المستخدم
  const chatbox = document.querySelector("#chatbox");
  chatbox.innerHTML += `<div class="user-response">${input}</div>`;

  // مسح محتوى مربع الإدخال
  document.querySelector("#input").value = "";

  // الحصول على الرد المولد وعرضه
  const response = await generateResponse(input);
  displayResponse(response);
};

// تعريف الدالة التي تعلم المتص

// 1 ทักทายตามช่วงเวลา
const greeting = document.querySelector("#greeting");
const hour = new Date().getHours();

if (hour < 10) {
  greeting.textContent = "ร้านยังไม่เปิด เจอกัน 10 โมงนะ";
} else if (hour < 14) {
  greeting.textContent = "หิวข้าวเที่ยงแล้วใช่ไหม สั่งได้เลย";
} else if (hour < 20) {
  greeting.textContent = "แวะมากินมื้อเย็นกันนะ";
} else {
  greeting.textContent = "ร้านปิดแล้ว พรุ่งนี้มาใหม่นะ";
}
// 2 ตะกร้าเลือกเมนู
const cartList = document.querySelector("#cart-list");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const cartEmpty = document.querySelector("#cart-empty");
let count = 0;
let total = 0;

function updateCart() {
  cartCount.textContent = `${count} รายการ`;
  cartTotal.textContent = total;
  if (count === 0) {
    cartEmpty.classList.remove("hidden");
  } else {
    cartEmpty.classList.add("hidden");
  }
}

const addButtons = document.querySelectorAll(".add-btn");
for (const btn of addButtons) {
  btn.addEventListener("click", function () {
    const name = btn.dataset.name;
    const price = Number(btn.dataset.price);

    const li = document.createElement("li");
    li.className = "flex justify-between items-center border border-brand-100 px-3 py-2";
    li.textContent = `${name} ${price} บาท`;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "ลบ";
    removeBtn.className = "text-red-600 hover:underline cursor-pointer";
    removeBtn.addEventListener("click", function () {
      li.remove();
      count = count - 1;
      total = total - price;
      updateCart();
    });

    li.append(removeBtn);
    cartList.append(li);
    count = count + 1;
    total = total + price;
    updateCart();
  });
}

// 3 บัตรคิว
const nowServing = document.querySelector("#now-serving");
const myQueue = document.querySelector("#my-queue");
let lastQueue = 0;
let serving = 0;

document.querySelector("#take-queue").addEventListener("click", function () {
  lastQueue = lastQueue + 1;
  const waiting = lastQueue - serving - 1;
  if (waiting === 0) {
    myQueue.textContent = `บัตรคิวของคุณคือ ${lastQueue} ไม่มีคิวรอข้างหน้า เตรียมตัวได้เลย`;
  } else {
    myQueue.textContent = `บัตรคิวของคุณคือ ${lastQueue} รออีก ${waiting} คิว ประมาณ ${waiting * 5} นาที`;
  }
});

document.querySelector("#next-queue").addEventListener("click", function () {
  if (serving < lastQueue) {
    serving = serving + 1;
    nowServing.textContent = serving;
  }
});

// 4 จองโต๊ะ
const bookingForm = document.querySelector("#booking-form");
const bookError = document.querySelector("#book-error");
const bookingList = document.querySelector("#booking-list");

function showError(message) {
  bookError.textContent = message;
  bookError.classList.remove("hidden");
}

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.querySelector("#book-name").value.trim();
  const people = document.querySelector("#book-people").value;
  const date = document.querySelector("#book-date").value;
  const time = document.querySelector("#book-time").value;

  if (name === "" || people === "" || date === "" || time === "") {
    showError("กรอกให้ครบทุกช่องก่อนนะ");
    return;
  }
  if (time < "10:00" || time > "20:00") {
    showError("ร้านเปิด 10.00 ถึง 20.00 น. เลือกเวลาในช่วงนี้นะ");
    return;
  }

  bookError.classList.add("hidden");

  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-brand-50 border border-brand-200 px-3 py-2";
  li.textContent = `${name} ${people} คน วันที่ ${date} เวลา ${time} น.`;

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.textContent = "ยกเลิก";
  cancelBtn.className = "text-red-600 hover:underline cursor-pointer";
  cancelBtn.addEventListener("click", function () {
    li.remove();
  });

  li.append(cancelBtn);
  bookingList.append(li);
  bookingForm.reset();
});

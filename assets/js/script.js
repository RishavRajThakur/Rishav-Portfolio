'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    if (modalImg && modalTitle && modalText) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    }

    testimonialsModalFunc();

  });

}

// add click event to modal close button
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);



// certificate modal variables
const certItems = document.querySelectorAll("[data-cert-item]");
const certModalContainer = document.querySelector("[data-cert-modal-container]");
const certModalCloseBtn = document.querySelector("[data-cert-modal-close-btn]");
const certOverlay = document.querySelector("[data-cert-overlay]");

const certModalImg = document.querySelector("[data-cert-modal-img]");
const certModalTitle = document.querySelector("[data-cert-modal-title]");
const certModalIssuer = document.querySelector("[data-cert-modal-issuer]");
const certModalDate = document.querySelector("[data-cert-modal-date]");
const certModalDesc = document.querySelector("[data-cert-modal-desc]");
const certModalLink = document.querySelector("[data-cert-modal-link]");
const certModalVerify = document.querySelector("[data-cert-modal-verify]");

// cert modal toggle function
const certModalFunc = function () {
  if (certModalContainer) {
    certModalContainer.classList.toggle("active");
  }
}

// add click event to all cert items
for (let i = 0; i < certItems.length; i++) {
  certItems[i].addEventListener("click", function () {
    const imgElem = this.querySelector("[data-cert-img]");
    const titleElem = this.querySelector("[data-cert-title]");
    const issuerElem = this.querySelector("[data-cert-issuer]");
    const dateElem = this.querySelector("[data-cert-date]");
    const descElem = this.querySelector("[data-cert-desc]");
    const verifyUrl = this.dataset.certVerify;

    if (imgElem && certModalImg) {
      certModalImg.src = imgElem.src;
      certModalImg.alt = imgElem.alt;
      if (certModalLink) certModalLink.href = imgElem.src;
    }
    if (titleElem && certModalTitle) {
      certModalTitle.innerHTML = titleElem.innerHTML;
    }
    if (issuerElem && certModalIssuer) {
      certModalIssuer.innerHTML = issuerElem.innerHTML;
    }
    if (dateElem && certModalDate) {
      certModalDate.innerHTML = dateElem.innerHTML;
    }
    if (descElem && certModalDesc) {
      certModalDesc.innerHTML = descElem.innerHTML;
    }

    if (certModalVerify) {
      if (verifyUrl) {
        certModalVerify.href = verifyUrl;
        certModalVerify.style.display = "inline-flex";
      } else {
        certModalVerify.style.display = "none";
        certModalVerify.href = "";
      }
    }

    certModalFunc();
  });
}

// add click event to cert modal close button & overlay
if (certModalCloseBtn) certModalCloseBtn.addEventListener("click", certModalFunc);
if (certOverlay) certOverlay.addEventListener("click", certModalFunc);

// Close on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (certModalContainer && certModalContainer.classList.contains("active")) {
      certModalFunc();
    }
    if (modalContainer && modalContainer.classList.contains("active")) {
      testimonialsModalFunc();
    }
  }
});



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  const normSelected = (selectedValue || "").trim().toLowerCase();

  for (let i = 0; i < filterItems.length; i++) {

    const itemCategory = (filterItems[i].dataset.category || "").trim().toLowerCase();

    if (normSelected === "all") {
      filterItems[i].classList.add("active");
    } else if (normSelected === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const formSuccessBanner = document.querySelector("[data-form-success]");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Trigger browser native validation tooltips if form has invalid inputs
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    formBtn.style.opacity = "0.7";
    formBtn.style.pointerEvents = "none";

    const payload = {
      name: form.elements["name"] ? form.elements["name"].value : "",
      email: form.elements["email"] ? form.elements["email"].value : "",
      phone: form.elements["phone"] ? form.elements["phone"].value : "",
      message: form.elements["message"] ? form.elements["message"].value : "",
      _subject: "New Portfolio Inquiry from Rishav's Portfolio",
      _template: "table",
      _captcha: "false"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/rishavjnk1234@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        form.reset();
        if (formSuccessBanner) {
          formSuccessBanner.style.display = "flex";
          setTimeout(() => {
            formSuccessBanner.style.display = "none";
          }, 7000);
        }
      } else {
        // Fallback to standard form submission if AJAX rejected
        form.action = "https://formsubmit.co/rishavjnk1234@gmail.com";
        form.submit();
      }
    } catch (err) {
      console.warn("AJAX fetch failed (likely local file protocol), falling back to standard submission:", err);
      // Fallback for local file:/// preview
      form.action = "https://formsubmit.co/rishavjnk1234@gmail.com";
      form.submit();
    } finally {
      formBtn.innerHTML = '<span>Submit</span><ion-icon name="paper-plane"></ion-icon>';
      formBtn.style.opacity = "1";
      formBtn.style.pointerEvents = "all";
    }
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// back to top button functionality
const backTopBtn = document.querySelector("[data-back-top-btn]");

if (backTopBtn) {
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 250) {
      backTopBtn.classList.add("active");
    } else {
      backTopBtn.classList.remove("active");
    }
  });

  backTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
var initHeader = (header) => {
    var burger = header.querySelector(".nheader__burger");
    var main = header.querySelector(".nheader__main");
    var hasdropdown_items = header.querySelectorAll(".nheader__hasdropdown");
    var dropdown_items = header.querySelectorAll(".nheader__dropdown");

    burger &&
        burger.addEventListener("click", () => {
            if (burger.classList.contains("active")) {
                hasdropdown_items.forEach((item) => {
                    if (item) {
                        item.classList.remove("active");
                        item.children[1] &&
                            (item.children[1].style.maxHeight = null);
                    }
                });
            }

            burger.classList.toggle("active");
            document.body.classList.toggle("lock");
            main.classList.toggle("active");
        });

    var mqMax1000 = window.matchMedia("(max-width: 1000px)");

    mqMax1000.addEventListener("change", (e) => {
        if (!e.matches) {
            // clear burger button, body and main menu
            burger.classList.remove("active");
            document.body.classList.remove("lock");
            main.classList.remove("active");

            // disable transition by resize
            dropdown_items.length > 0 &&
                dropdown_items.forEach((item) => {
                    item.style.display = "none";
                    setTimeout(() => {
                        item.style.display = "";
                    }, 500);
                });

            // clear all dropdown menues
            hasdropdown_items.forEach((item) => {
                item.classList.remove("active");
                item.children[1] && (item.children[1].style.maxHeight = null);
            });
        } else {
            hasdropdown_items.forEach((item) => {
                item.classList.remove("active");
                item.children[1] && (item.children[1].style.maxHeight = null);
            });
        }
    });

    hasdropdown_items.length > 0 &&
        hasdropdown_items.forEach((item) => {
            item.addEventListener("mouseover", () => {
                if (window.innerWidth > 1000) {
                    hasdropdown_items.forEach((i) => {
                        i !== item && i.classList.remove("active");
                    });
                    item.classList.add("active");
                }
            });
        });

    window.addEventListener("click", (e) => {
        if (window.innerWidth > 1000) {
            var hasdropdown = e.target.closest(".nheader__hasdropdown");
            !hasdropdown &&
                hasdropdown_items.forEach((item) =>
                    item.classList.remove("active")
                );
        }
    });

    hasdropdown_items.forEach((item) => {
        var heading = item.children[0];
        var list = heading.nextElementSibling;
        heading.addEventListener("click", (e) => {
            var isActive = heading.classList.contains("active");
            if (window.innerWidth <= 1000) {
                if (!isActive) {
                    heading.classList.add("active");
                    list && (list.style.maxHeight = list.scrollHeight + "px");
                } else {
                    heading.classList.remove("active");
                    list && (list.style.maxHeight = null);
                }
            }
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth <= 1000) {
            hasdropdown_items.forEach((item) => {
                var isActive = item.classList.contains("active");
                if (isActive) {
                    item.children[1] &&
                        (item.children[1].style.maxHeight =
                            item.children[1].scrollHeight + "px");
                }
            });
        }
    });
};

document.addEventListener("DOMContentLoaded", () => {
    var header = document.querySelector(".nheader");
    header && initHeader(header);
});

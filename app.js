/* ============================================================
   MAULI AGRO INDUSTRIES – app.js
   ============================================================ */

$(function () {

  /* --------------------------------------------------------
     PRELOADER
  -------------------------------------------------------- */
  $(window).on('load', function () {
    setTimeout(function () {
      $('#preloader').addClass('hidden');
    }, 200);
  });

  /* --------------------------------------------------------
     NAVBAR SCROLL BEHAVIOR
  -------------------------------------------------------- */
  var $nav = $('#mainNav');
  $(window).on('scroll', function () {
    var scrollY = $(this).scrollTop();
    if (scrollY > 80) {
      $nav.addClass('scrolled');
    } else {
      $nav.removeClass('scrolled');
    }

    // Back to Top
    if (scrollY > 400) {
      $('#backToTop').addClass('visible');
    } else {
      $('#backToTop').removeClass('visible');
    }

    // Active nav link highlighting
    var sections = ['home', 'about', 'products', 'gallery', 'inquiry', 'contact'];
    var scrollPos = scrollY + 120;
    sections.forEach(function (id) {
      var $sec = $('#' + id);
      if ($sec.length) {
        var top = $sec.offset().top;
        var bottom = top + $sec.outerHeight();
        if (scrollPos >= top && scrollPos < bottom) {
          $('.nav-link').removeClass('active');
          $('.nav-link[href="#' + id + '"]').addClass('active');
        }
      }
    });
  });

  /* --------------------------------------------------------
     BACK TO TOP
  -------------------------------------------------------- */
  $('#backToTop').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
  });

  /* --------------------------------------------------------
     SMOOTH SCROLL FOR NAV LINKS
  -------------------------------------------------------- */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this).attr('href');
    if ($(target).length) {
      e.preventDefault();
      var offset = $(target).offset().top - 70;
      $('html, body').animate({ scrollTop: offset }, 800, 'swing');
      // Close mobile navbar
      $('#navbarNav').collapse('hide');
    }
  });

  /* --------------------------------------------------------
     HERO SLIDER
  -------------------------------------------------------- */
  var slideIndex = 0;
  var $slides = $('.hero-slide');
  var slideCount = $slides.length;
  var slideInterval = null;

  function showSlide(index) {
    $slides.removeClass('active');
    $slides.eq(index).addClass('active');
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slideCount;
    showSlide(slideIndex);
  }

  if (slideCount > 1) {
    slideInterval = setInterval(nextSlide, 5000);
  }

  /* --------------------------------------------------------
     PRODUCT FILTER
  -------------------------------------------------------- */
  $('.filter-btn').on('click', function () {
    var filter = $(this).data('filter');
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    if (filter === 'all') {
      $('.product-item').each(function () {
        $(this).removeClass('hidden').hide().fadeIn(400);
      });
    } else {
      $('.product-item').each(function () {
        if ($(this).hasClass(filter)) {
          $(this).removeClass('hidden').hide().fadeIn(400);
        } else {
          $(this).addClass('hidden').hide();
        }
      });
    }
  });

  /* --------------------------------------------------------
     INQUIRY TABS
  -------------------------------------------------------- */
  $('.inq-tab').on('click', function () {
    var tab = $(this).data('tab');
    $('.inq-tab').removeClass('active');
    $(this).addClass('active');
    $('.inq-form-panel').removeClass('active').hide();
    $('#tab-' + tab).addClass('active').hide().fadeIn(400);
  });

  /* --------------------------------------------------------
     GALLERY LIGHTBOX
  -------------------------------------------------------- */
  var galleryImages = [];
  var currentLightboxIndex = 0;

  // Collect gallery images
  function buildGalleryData() {
    galleryImages = [];
    $('.gal-item').each(function () {
      var img = $(this).find('img');
      var cap = $(this).find('.gal-caption').text();
      galleryImages.push({ src: img.attr('src'), caption: cap });
    });
  }
  buildGalleryData();

  function openLightbox(index) {
    currentLightboxIndex = index;
    var item = galleryImages[index];
    $('#lightboxImg').attr('src', item.src).attr('alt', item.caption);
    $('#lightboxCaption').text(item.caption);
    $('#lightboxOverlay').addClass('active');
    $('body').css('overflow', 'hidden');
  }

  function closeLightbox() {
    $('#lightboxOverlay').removeClass('active');
    $('body').css('overflow', '');
  }

  $(document).on('click', '.gal-item', function () {
    var index = $('.gal-item').index(this);
    openLightbox(index);
  });

  $('#lightboxClose').on('click', closeLightbox);

  $('#lightboxOverlay').on('click', function (e) {
    if ($(e.target).is('#lightboxOverlay')) closeLightbox();
  });

  $('#lightboxNext').on('click', function () {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    openLightbox(currentLightboxIndex);
  });

  $('#lightboxPrev').on('click', function () {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentLightboxIndex);
  });

  // Keyboard navigation
  $(document).on('keydown', function (e) {
    if ($('#lightboxOverlay').hasClass('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') $('#lightboxNext').trigger('click');
      if (e.key === 'ArrowLeft') $('#lightboxPrev').trigger('click');
    }
  });

  /* --------------------------------------------------------
     TESTIMONIAL SWIPER
  -------------------------------------------------------- */
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        640: { slidesPerView: 1.5 },
        992: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
      }
    });
  }

  /* --------------------------------------------------------
     AOS INIT
  -------------------------------------------------------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      offset: 60,
      duration: 700,
      easing: 'ease-out-cubic'
    });
  }

  /* --------------------------------------------------------
     PARALLAX BACKGROUNDS (simple jQuery parallax)
  -------------------------------------------------------- */
  function doParallax() {
    var scrollY = $(window).scrollTop();
    var wHeight = $(window).height();

    $('.about-bg, .why-bg, .contact-bg').each(function () {
      var $el = $(this);
      var parentTop = $el.parent().offset().top;
      var parentH = $el.parent().outerHeight();
      if (scrollY + wHeight > parentTop && scrollY < parentTop + parentH) {
        var offset = (scrollY - parentTop) * 0.25;
        $el.css('transform', 'translateY(' + offset + 'px)');
      }
    });
  }

  $(window).on('scroll', doParallax);

  /* --------------------------------------------------------
     COUNTER ANIMATION
  -------------------------------------------------------- */
  function animateCounters() {
    $('.stat-num').each(function () {
      if ($(this).data('animated')) return;
      var $el = $(this);
      var elTop = $el.offset().top;
      var scrollBottom = $(window).scrollTop() + $(window).height();
      if (scrollBottom > elTop + 80) {
        $el.data('animated', true);
        var target = parseInt($el.text().replace(/\D/g, ''), 10);
        var suffix = $el.text().replace(/[0-9]/g, '');
        var count = 0;
        var increment = Math.ceil(target / 60);
        var timer = setInterval(function () {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          $el.text(count + suffix);
        }, 25);
      }
    });
  }

  $(window).on('scroll', animateCounters);
  animateCounters();

  /* --------------------------------------------------------
     PRODUCT CARD TILT EFFECT
  -------------------------------------------------------- */
  $(document).on('mousemove', '.product-card', function (e) {
    var $card = $(this);
    var offset = $card.offset();
    var x = e.pageX - offset.left;
    var y = e.pageY - offset.top;
    var w = $card.outerWidth();
    var h = $card.outerHeight();
    var rx = ((y - h / 2) / h) * -8;
    var ry = ((x - w / 2) / w) * 8;
    $card.css('transform', 'translateY(-8px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)');
    $card.css('transition', 'transform 0.1s ease');
  }).on('mouseleave', '.product-card', function () {
    $(this).css({ 'transform': '', 'transition': 'all 0.4s cubic-bezier(0.25,0.8,0.25,1)' });
  });

});

/* ============================================================
   FORM SUBMISSION (global function used in HTML onclick)
   ============================================================ */
function submitForm(btn) {
  var $btn = $(btn);
  var originalText = $btn.html();

  // Validate: check all required inputs in the visible panel
  var $panel = $btn.closest('.inq-form-panel, .contact-form-box');
  var hasError = false;
  $panel.find('input[placeholder*="*"], input[required]').each(function () {
    if ($(this).val().trim() === '') {
      $(this).css('border-color', '#e74c3c');
      hasError = true;
    } else {
      $(this).css('border-color', '');
    }
  });

  if (hasError) {
    $btn.text('Please fill required fields').css('background', '#e74c3c');
    setTimeout(function () {
      $btn.html(originalText).css('background', '');
    }, 2000);
    return;
  }

  // Simulate send
  $btn.html('<i class="bi bi-hourglass-split me-2"></i>Sending...').prop('disabled', true);

  setTimeout(function () {
    $btn.html('<i class="bi bi-check-circle me-2"></i>Sent!');

    // Show toast
    var $toast = $('#toastMsg');
    $toast.addClass('show');
    setTimeout(function () { $toast.removeClass('show'); }, 4000);

    // Reset
    setTimeout(function () {
      $btn.html(originalText).prop('disabled', false);
      $panel.find('input, textarea, select').val('');
    }, 2500);
  }, 1800);
}

/**
 * Testimonial Form Handler
 * Handles URL parameter prefilling, avatar preview, validation, and form submission
 */

(function () {
  'use strict';

  // Configuration
  const CONFIG = {
    // n8n webhook URL
    webhookUrl: 'https://erikyin-n8n.zeabur.app/webhook/testimonial-a3f8b1c4',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png'],
    minQuoteLength: 20,
    // Max quote length varies by language (Chinese chars = more info density)
    maxQuoteLengthByLang: {
      'zh-Hant': 100,
      'zh-Hans': 100,
      'en': 250,
      'ja': 150,
      'ko': 150
    },
    defaultMaxQuoteLength: 100
  };

  // Get max quote length for current language
  function getMaxQuoteLength() {
    const lang = getCurrentLang();
    return CONFIG.maxQuoteLengthByLang[lang] || CONFIG.defaultMaxQuoteLength;
  }

  // Localized messages
  const MESSAGES = {
    'zh-Hant': {
      required: '請填寫此欄位',
      invalidEmail: '請輸入有效的電子郵件地址',
      quoteTooShort: '證言至少需要 20 個字',
      quoteTooLong: '證言不能超過 100 個字',
      avatarRequired: '請上傳頭像圖片',
      fileTooLarge: '圖片大小不能超過 5MB',
      invalidFileType: '只接受 JPG、PNG 格式',
      networkError: '網路錯誤，請稍後再試',
      submitError: '提交失敗，請稍後再試',
      submitting: '提交中...',
      changeAvatar: '更換'
    },
    'zh-Hans': {
      required: '请填写此栏位',
      invalidEmail: '请输入有效的电子邮件地址',
      quoteTooShort: '证言至少需要 20 个字',
      quoteTooLong: '证言不能超过 100 个字',
      avatarRequired: '请上传头像图片',
      fileTooLarge: '图片大小不能超过 5MB',
      invalidFileType: '只接受 JPG、PNG 格式',
      networkError: '网络错误，请稍后再试',
      submitError: '提交失败，请稍后再试',
      submitting: '提交中...',
      changeAvatar: '更换'
    },
    'en': {
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address',
      quoteTooShort: 'Testimonial must be at least 20 characters',
      quoteTooLong: 'Testimonial cannot exceed 250 characters',
      avatarRequired: 'Please upload an avatar image',
      fileTooLarge: 'Image size cannot exceed 5MB',
      invalidFileType: 'Only JPG and PNG formats accepted',
      networkError: 'Network error, please try again',
      submitError: 'Submission failed, please try again',
      submitting: 'Submitting...',
      changeAvatar: 'Change'
    },
    'ja': {
      required: 'この項目は必須です',
      invalidEmail: '有効なメールアドレスを入力してください',
      quoteTooShort: '感想は最低20文字必要です',
      quoteTooLong: '感想は150文字以内にしてください',
      avatarRequired: 'アバター画像をアップロードしてください',
      fileTooLarge: '画像サイズは5MB以下にしてください',
      invalidFileType: 'JPG、PNG形式のみ対応',
      networkError: 'ネットワークエラー、後でお試しください',
      submitError: '送信に失敗しました、後でお試しください',
      submitting: '送信中...',
      changeAvatar: '変更'
    },
    'ko': {
      required: '이 필드를 입력해 주세요',
      invalidEmail: '유효한 이메일 주소를 입력해 주세요',
      quoteTooShort: '후기는 최소 20자 이상이어야 합니다',
      quoteTooLong: '후기는 150자를 초과할 수 없습니다',
      avatarRequired: '프로필 이미지를 업로드해 주세요',
      fileTooLarge: '이미지 크기는 5MB 이하여야 합니다',
      invalidFileType: 'JPG, PNG 형식만 지원됩니다',
      networkError: '네트워크 오류, 나중에 다시 시도해 주세요',
      submitError: '제출에 실패했습니다, 나중에 다시 시도해 주세요',
      submitting: '제출 중...',
      changeAvatar: '변경'
    }
  };

  // Get current language from HTML lang attribute
  function getCurrentLang() {
    return document.documentElement.lang || 'zh-Hant';
  }

  // Get localized message
  function getMessage(key) {
    const lang = getCurrentLang();
    const messages = MESSAGES[lang] || MESSAGES['en'];
    return messages[key] || MESSAGES['en'][key] || key;
  }

  // DOM Elements
  const form = document.getElementById('testimonial-form');
  const avatarInput = document.getElementById('avatar-input');
  const avatarPreview = document.getElementById('avatar-preview');
  const quoteInput = document.getElementById('quote-input');
  const quoteCount = document.getElementById('quote-count');
  const nameInput = document.getElementById('name-input');
  const emailInput = document.getElementById('email-input');
  const roleInput = document.getElementById('role-input');
  const companyInput = document.getElementById('company-input');
  const langInput = document.getElementById('lang-input');
  const submitBtn = document.getElementById('submit-btn');
  const errorDiv = document.getElementById('form-error');
  const successDiv = document.getElementById('success-message');

  // Selected file reference
  let selectedFile = null;

  /**
   * Parse URL parameters and prefill form fields
   */
  function prefillFromUrl() {
    const params = new URLSearchParams(window.location.search);

    const name = params.get('name');
    const email = params.get('email');

    if (name && nameInput) {
      nameInput.value = decodeURIComponent(name);
    }

    if (email && emailInput) {
      emailInput.value = decodeURIComponent(email);
    }
  }

  /**
   * Clear all child nodes from an element safely
   */
  function clearChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  /**
   * Process and preview avatar file
   */
  function processAvatarFile(file) {
    if (!file) {
      return false;
    }

    // Validate file type
    if (!CONFIG.allowedTypes.includes(file.type)) {
      showError(getMessage('invalidFileType'));
      return false;
    }

    // Validate file size
    if (file.size > CONFIG.maxFileSize) {
      showError(getMessage('fileTooLarge'));
      return false;
    }

    // Store file reference
    selectedFile = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = function (e) {
      // Clear existing content using safe DOM method
      clearChildren(avatarPreview);

      // Create image element
      const img = document.createElement('img');
      img.src = e.target.result;
      img.alt = 'Avatar preview';
      img.className = 'testimonial-card__avatar-img';

      avatarPreview.appendChild(img);
      avatarPreview.classList.add('has-image');
    };
    reader.readAsDataURL(file);

    // Clear any previous error
    hideError();
    return true;
  }

  /**
   * Handle avatar file selection from input
   */
  function handleAvatarChange(event) {
    const file = event.target.files[0];
    if (!processAvatarFile(file)) {
      avatarInput.value = '';
    }
  }

  /**
   * Handle drag and drop for avatar
   */
  function setupDragAndDrop() {
    const dropZone = avatarPreview;

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, preventDefaults, false);
      document.body.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Highlight drop zone when dragging over
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.add('drag-over');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.remove('drag-over');
      }, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processAvatarFile(files[0]);
      }
    }, false);
  }

  // Cache for max length (set during init)
  let cachedMaxLength = null;

  /**
   * Update quote character counter (optimized)
   */
  function updateQuoteCounter() {
    const length = quoteInput.value.length;
    if (cachedMaxLength === null) {
      cachedMaxLength = getMaxQuoteLength();
    }

    // Only update DOM if value changed
    if (quoteCount.textContent !== String(length)) {
      quoteCount.textContent = length;
    }

    // Determine new state
    let newState = '';
    if (length > cachedMaxLength) {
      newState = 'error';
    } else if (length > cachedMaxLength * 0.9) {
      newState = 'warning';
    }

    // Only update class if state changed
    const counterWrapper = quoteCount.parentElement;
    const currentState = counterWrapper.classList.contains('error') ? 'error' :
                         counterWrapper.classList.contains('warning') ? 'warning' : '';

    if (newState !== currentState) {
      counterWrapper.classList.remove('warning', 'error');
      if (newState) {
        counterWrapper.classList.add(newState);
      }
    }
  }

  /**
   * Show error message
   */
  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.hidden = false;
  }

  /**
   * Hide error message
   */
  function hideError() {
    errorDiv.hidden = true;
  }

  /**
   * Validate form before submission
   */
  function validateForm() {
    // Check avatar
    if (!selectedFile) {
      showError(getMessage('avatarRequired'));
      return false;
    }

    // Check quote length
    const quoteLength = quoteInput.value.trim().length;
    const maxLength = getMaxQuoteLength();
    if (quoteLength < CONFIG.minQuoteLength) {
      showError(getMessage('quoteTooShort'));
      return false;
    }
    if (quoteLength > maxLength) {
      showError(getMessage('quoteTooLong'));
      return false;
    }

    // Check name
    if (!nameInput.value.trim()) {
      showError(getMessage('required'));
      nameInput.focus();
      return false;
    }

    // Check email
    if (!emailInput.value.trim()) {
      showError(getMessage('required'));
      emailInput.focus();
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(getMessage('invalidEmail'));
      emailInput.focus();
      return false;
    }

    return true;
  }

  /**
   * Handle form submission
   */
  async function handleSubmit(event) {
    event.preventDefault();

    // Validate
    if (!validateForm()) {
      return;
    }

    // Check webhook URL
    if (!CONFIG.webhookUrl) {
      console.warn('Webhook URL not configured. Form data:');
      console.log({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        quote: quoteInput.value.trim(),
        role: roleInput.value.trim(),
        company: companyInput.value.trim(),
        lang: langInput.value,
        avatar: selectedFile ? selectedFile.name : null
      });

      // Show success for demo purposes
      showSuccess();
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('name', nameInput.value.trim());
    formData.append('email', emailInput.value.trim());
    formData.append('quote', quoteInput.value.trim());
    formData.append('role', roleInput.value.trim());
    formData.append('company', companyInput.value.trim());
    formData.append('lang', langInput.value);
    formData.append('avatar', selectedFile);

    // Update UI
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    hideError();

    try {
      const response = await fetch(CONFIG.webhookUrl, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      // Show success
      showSuccess();
    } catch (error) {
      console.error('Submission error:', error);
      showError(getMessage('submitError'));
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  }

  /**
   * Show success state
   */
  function showSuccess() {
    form.hidden = true;
    successDiv.hidden = false;

    // Scroll to top of success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /**
   * Initialize form
   */
  function init() {
    if (!form) {
      console.warn('Testimonial form not found');
      return;
    }

    // Update counter display with max length (soft limit, validated on submit)
    const maxLength = getMaxQuoteLength();
    const quoteMaxSpan = document.getElementById('quote-max');
    if (quoteMaxSpan) {
      quoteMaxSpan.textContent = maxLength;
    }

    // Prefill from URL parameters
    prefillFromUrl();

    // Event listeners
    avatarInput.addEventListener('change', handleAvatarChange);
    quoteInput.addEventListener('input', updateQuoteCounter);
    form.addEventListener('submit', handleSubmit);

    // Setup drag and drop for avatar
    setupDragAndDrop();

    // Initialize counter
    updateQuoteCounter();

    console.log('Testimonial form initialized');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

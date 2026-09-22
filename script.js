/**
 * script.js (Ultimate Edition)
 * Feature: Avatar Remove & Clear LocalStorage Data completely integrated.
 */

// --- 1. STATE MANAGEMENT (상태 관리) ---
// 애플리케이션의 모든 데이터를 저장하는 중앙 저장소입니다. 
// 사용자가 폼에 입력하는 텍스트, 이미지, 설정값 등이 실시간으로 여기에 기록됩니다.
const state = {
    personalInfo: {
        fullname: '', title: '', phone: '', email: '', location: '',
        linkedin: '', portfolio: '', website: '', summary: '', avatar: ''
    },
    workExperience: [],
    education: [],
    projects: [],
    skills: { techSkills: '', softSkills: '' },
    languagesCerts: { languages: '', certifications: '' },
    awardsVolunteer: { awards: '', volunteer: '' },
    additional: '',
    settings: { darkMode: false, language: 'en', template: 'modern' }
};

// --- 2. BILINGUAL MATRIX (i18n) (다국어 번역 사전) ---
// 영어(en)와 한국어(kr) UI 텍스트를 모아둔 딕셔너리입니다.
const i18n = {
    en: {
        'app-main-title': 'Build Your Resume',
        'editor-panel-title': 'Resume Editor Panel',
        'preview-panel-title': 'A4 Live Print Preview',

        'legend-personal': 'Personal Information',
        'legend-experience': 'Work Experience',
        'legend-education': 'Education',
        'legend-projects': 'Projects & Portfolios',
        'legend-skills': 'Skills & Core Competencies',
        'legend-languages': 'Languages & Certifications',
        'legend-awards': 'Awards & Volunteer Work',
        'legend-additional': 'Additional Information',

        summary: 'Professional Summary',
        experience: 'Work Experience',
        education: 'Education',
        skills: 'Skills',
        projects: 'Projects',
        awards: 'Awards & Honors',
        volunteer: 'Volunteer Experience',
        additional: 'Additional Information',
        present: 'Present',
        
        lblPhonePrefix: 'Phone: ',
        lblEmailPrefix: 'Email: ',
        lblLocationPrefix: 'Location: ',
        lblLinkedinPrefix: 'LinkedIn: ',
        lblPortfolioPrefix: 'Portfolio: ',
        lblWebsitePrefix: 'Website: ',

        lblCompany: 'Company / Organization',
        lblRole: 'Job Title / Role',
        lblDuration: 'Duration / Period',
        lblDesc: 'Description / Key Achievements',
        lblSchool: 'Institution / School',
        lblDegree: 'Degree / Major',
        lblGraduation: 'Graduation Period',
        lblEduDetails: 'Additional Details (Optional)',
        lblProjName: 'Project Name',
        lblProjLink: 'Project Link / URL',
        lblProjDesc: 'Description / Tech Stack',
        
        phCompany: 'Google Inc.',
        phRole: 'Software Engineer',
        phDuration: '2023 - Present',
        phDesc: 'Developed scalable microservices using Node.js...',
        phSchool: 'Stanford University',
        phDegree: 'B.S. in Computer Science',
        phGraduation: '2019 - 2023',
        phEduDetails: 'GPA: 3.9/4.0',
        phProjName: 'E-Commerce Engine',
        phProjLink: 'https://github.com/user/repo',
        phProjDesc: 'Built a high-throughput platform using React and Go.',

        'lbl-fullname': 'Full Name',
        'lbl-title': 'Job Title', // 직무 타이틀 수정 완료
        'lbl-phone': 'Phone Number',
        'lbl-email': 'Email Address',
        'lbl-location': 'Location (City, Country)',
        'lbl-linkedin': 'LinkedIn URL',
        'lbl-portfolio': 'Portfolio URL',
        'lbl-website': 'Personal Website',
        'lbl-avatar': 'Profile Avatar Photo',
        'lbl-summary': 'Professional Summary / Bio',
        'lbl-tech-skills': 'Technical Skills (Comma Separated)',
        'lbl-soft-skills': 'Core / Soft Skills (Comma Separated)',
        'lbl-languages': 'Languages Spoken',
        'lbl-certifications': 'Licenses & Certifications',
        'lbl-awards': 'Honors & Awards',
        'lbl-volunteer': 'Volunteer Experience',
        'lbl-additional': 'Interests & Miscellaneous Notes',

        'btn-choose-file': '✨ Choose File',
        'file-name-display-none': 'No file chosen',

        'btn-add-experience': '➕ Add Work Experience',
        'btn-add-education': '➕ Add Education',
        'btn-add-project': '➕ Add Project',
        'btn-export-json': '💾 Export JSON Backup',
        'btn-export-pdf': '📄 Download High-Quality PDF',
        'btn-print': '🖨️ Print Resume',
        'btn-clear-data': '🗑️ Clear Data',
        'confirm-clear': 'Are you sure you want to delete all resume data? This cannot be undone.',
        
        previewTech: 'Technical:',
        previewSoft: 'Core/Soft:',
        previewLang: 'Languages:',
        previewCert: 'Certifications:',
        previewAwards: 'Honors & Awards:',
        previewVol: 'Volunteer Work:',
        previewInterests: 'Interests & More:',
        previewPlaceholderText: 'Fill out the editor panel to automatically render your A4 live print preview layout.'
    },
    kr: {
        'app-main-title': '이력서 빌더',
        'editor-panel-title': '이력서 작성 에디터',
        'preview-panel-title': 'A4 실시간 미리보기',

        'legend-personal': '인적 사항 및 연락처',
        'legend-experience': '경력 사항',
        'legend-education': '학력 사항',
        'legend-projects': '프로젝트 및 포트폴리오',
        'legend-skills': '보유 기술 및 핵심 역량',
        'legend-languages': '외국어 및 자격증',
        'legend-awards': '수상 실적 및 봉사 활동',
        'legend-additional': '기타 추가 정보',

        summary: '자기소개 및 요약',
        experience: '경력 사항',
        education: '학력 사항',
        skills: '보유 기술',
        projects: '프로젝트 수행 이력',
        awards: '수상 내역',
        volunteer: '봉사 활동',
        additional: '기타 추가 정보',
        present: '재직 중 / 진행 중',
        
        lblPhonePrefix: '전화번호: ',
        lblEmailPrefix: '이메일: ',
        lblLocationPrefix: '지역: ',
        lblLinkedinPrefix: '링크드인: ',
        lblPortfolioPrefix: '포트폴리오: ',
        lblWebsitePrefix: '웹사이트: ',

        lblCompany: '회사명 / 기관명',
        lblRole: '직책 / 담당 역할',
        lblDuration: '재직 기간 / 참여 기간',
        lblDesc: '주요 업무 내용 및 성과',
        lblSchool: '학교명 / 교육기관명',
        lblDegree: '학위 / 전공',
        lblGraduation: '졸업 시기 / 기간',
        lblEduDetails: '기타 추가 학업 내용 (선택)',
        lblProjName: '프로젝트명',
        lblProjLink: '프로젝트 링크 / URL',
        lblProjDesc: '상세 설명 및 사용 기술 스택',
        
        phCompany: '구글 코리아',
        phRole: '소프트웨어 엔지니어',
        phDuration: '2023 - 현재',
        phDesc: 'Node.js 및 AWS를 활용한 마이크로서비스 설계...',
        phSchool: '한국대학교',
        phDegree: '컴퓨터공학과 학사',
        phGraduation: '2019 - 2023',
        phEduDetails: '학점: 4.0/4.5',
        phProjName: '이커머스 플랫폼',
        phProjLink: 'https://github.com/user/repo',
        phProjDesc: 'React와 Go 언어를 기반으로 한 거래 시스템 빌드.',

        'lbl-fullname': '이름 / 성명',
        'lbl-title': '지원 직무', // 직무 타이틀 수정 완료
        'lbl-phone': '전화번호',
        'lbl-email': '이메일 주소',
        'lbl-location': '거주지 (시/구, 국가)',
        'lbl-linkedin': '링크드인 프로필 URL',
        'lbl-portfolio': '포트폴리오 주소',
        'lbl-website': '개인 웹사이트 / 블로그',
        'lbl-avatar': '프로필 사진 등록',
        'lbl-summary': '자기소개 요약문',
        'lbl-tech-skills': '기술 스택 (쉼표로 구분)',
        'lbl-soft-skills': '핵심 역량 및 협업 능력 (쉼표로 구분)',
        'lbl-languages': '외국어 능력',
        'lbl-certifications': '자격증 및 면허',
        'lbl-awards': '수상 실적 및 훈장',
        'lbl-volunteer': '봉사 활동 이력',
        'lbl-additional': '취미, 관심사 및 기타 특이사항',

        'btn-choose-file': '✨ 파일 선택',
        'file-name-display-none': '선택된 파일 없음',

        'btn-add-experience': '➕ 경력 사항 추가',
        'btn-add-education': '➕ 학력 사항 추가',
        'btn-add-project': '➕ 프로젝트 추가',
        'btn-export-json': '💾 JSON 데이터 내보내기',
        'btn-export-pdf': '📄 고품질 PDF 다운로드',
        'btn-print': '🖨️ 이력서 인쇄',
        'btn-clear-data': '🗑️ 전체 데이터 초기화',
        'confirm-clear': '작성 중인 모든 이력서 데이터와 사진을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
        
        previewTech: '기술 스택:',
        previewSoft: '핵심 역량:',
        previewLang: '보유 외국어:',
        previewCert: '자격증 목록:',
        previewAwards: '수상 내역:',
        previewVol: '봉사 활동:',
        previewInterests: '기타 관심사:',
        previewPlaceholderText: '좌측 에디터 패널을 작성하면 구조화된 A4 캔버스 규격의 실시간 인쇄용 프리뷰 레이아웃이 여기에 동적으로 렌더링됩니다.'
    }
};

// 지정된 언어에 맞춰 번역된 텍스트를 반환하는 함수
function translate(key) {
    const currentLang = state.settings.language || 'en';
    if (i18n[currentLang] && i18n[currentLang][key]) return i18n[currentLang][key];
    return i18n['en'][key] || key;
}

// --- 3. APPLICATION ENTRY POINT (앱 시작점) ---
// 페이지 로드 완료 시 초기화 작업들을 순서대로 실행합니다.
document.addEventListener('DOMContentLoaded', () => {
    loadData();             // 로컬 스토리지에서 기존 데이터 불러오기
    setupEventListeners();  // 각종 버튼 및 입력 필드 이벤트 감지 시작
    translateStaticUI();    // HTML의 고정된 텍스트들을 현재 언어로 번역
    renderDynamicInputs();  // 경력, 학력 등 동적 입력칸 화면 생성
    applySettings();        // 다크모드 및 템플릿 설정 화면 적용
    updatePreview();        // 우측 이력서 미리보기 화면 렌더링
});

// --- 4. EVENT LIFECYCLES (이벤트 감지 및 연결) ---
function setupEventListeners() {
    const form = document.getElementById('resume-form');
    if (!form) return;

    // 폼 내의 모든 입력(타이핑)을 감지하여 상태(state)에 실시간 반영
    form.addEventListener('input', (e) => {
        const { name, id, value } = e.target;
        
        // 추가된 동적 항목(경력, 학력, 프로젝트)의 데이터 저장 처리
        if (e.target.closest('.dynamic-item')) {
            const dynamicItem = e.target.closest('.dynamic-item');
            const type = dynamicItem.dataset.type;
            const index = parseInt(dynamicItem.dataset.index, 10);
            
            if (type === 'experience') state.workExperience[index][name] = value;
            if (type === 'education') state.education[index][name] = value;
            if (type === 'project') state.projects[index][name] = value;
        } 
        // 일반 고정 항목(개인정보, 스킬 등)의 데이터 저장 처리
        else if (id && id.startsWith('input-')) {
            if (name === 'techSkills' || name === 'softSkills') state.skills[name] = value;
            else if (name === 'languages' || name === 'certifications') state.languagesCerts[name] = value;
            else if (name === 'awards' || name === 'volunteer') state.awardsVolunteer[name] = value;
            else if (name === 'additional') state.additional = value;
            else state.personalInfo[name] = value;
        }
        saveData();       // 변경될 때마다 로컬 스토리지 자동 백업
        updatePreview();  // 우측 미리보기 화면 실시간 업데이트
    });

    // 프로필 사진 파일 업로드 처리
    const avatarInput = document.getElementById('input-avatar');
    const fileNameDisplay = document.getElementById('file-name-display');

    if (avatarInput) {
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (fileNameDisplay) fileNameDisplay.textContent = file.name;
                const reader = new FileReader(); // 파일을 이미지 데이터(base64)로 변환
                reader.onload = (event) => {
                    state.personalInfo.avatar = event.target.result; // 상태에 이미지 저장
                    saveData();
                    updatePreview();
                };
                reader.readAsDataURL(file);
            } else {
                if (fileNameDisplay) fileNameDisplay.textContent = translate('file-name-display-none');
            }
        });
    }

    // 상단 네비게이션 제어 버튼들 연결 (테마, 템플릿, 언어, 인쇄)
    document.getElementById('theme-toggle')?.addEventListener('click', toggleDarkMode);
    document.getElementById('template-select')?.addEventListener('change', (e) => switchTemplate(e.target.value));
    document.getElementById('lang-switch')?.addEventListener('change', (e) => switchLanguage(e.target.value));
    document.getElementById('btn-print')?.addEventListener('click', () => window.print());

    // 하단 데이터 백업 및 PDF 내보내기 버튼 연결
    document.getElementById('btn-export-json')?.addEventListener('click', exportJSON);
    document.getElementById('btn-import-json')?.addEventListener('change', importJSON);
    document.getElementById('btn-export-pdf')?.addEventListener('click', exportToPDF);

    // 동적 항목 추가(+) 버튼 연결
    document.getElementById('btn-add-experience')?.addEventListener('click', addWorkExperience);
    document.getElementById('btn-add-education')?.addEventListener('click', addEducation);
    document.getElementById('btn-add-project')?.addEventListener('click', addProject);

    // [NEW] 아바타 사진 삭제 로직: 상태 비우기, 파일 input 초기화, 미리보기 업데이트
    document.getElementById('btn-remove-avatar')?.addEventListener('click', () => {
        state.personalInfo.avatar = '';
        if (avatarInput) avatarInput.value = '';
        if (fileNameDisplay) fileNameDisplay.textContent = translate('file-name-display-none');
        saveData();
        updatePreview();
    });

    // [NEW] 데이터 전체 초기화 로직: 경고창 확인 후 로컬 스토리지 삭제 및 페이지 새로고침
    document.getElementById('btn-clear-data')?.addEventListener('click', () => {
        if (confirm(translate('confirm-clear'))) {
            localStorage.removeItem('production_cv_builder_state');
            location.reload();
        }
    });
}

// 화면의 고정된 HTML 텍스트(라벨, 섹션 제목 등)를 현재 언어에 맞춰 일괄 변경
function translateStaticUI() {
    Object.keys(i18n.en).forEach(key => {
        const node = document.getElementById(key);
        if (node) { node.textContent = translate(key); return; }

        if (key.startsWith('lbl-')) {
            const targetId = key.replace('lbl-', 'input-');
            const labelNode = document.querySelector(`label[for="${targetId}"]`);
            if (labelNode) labelNode.textContent = translate(key);
            return;
        }
        if (key.startsWith('legend-')) {
            const targetSectionId = key.replace('legend-', 'section-');
            const legendNode = document.querySelector(`#${targetSectionId} legend`);
            if (legendNode) legendNode.textContent = translate(key);
            return;
        }
    });

    const fileNameDisplay = document.getElementById('file-name-display');
    const avatarInput = document.getElementById('input-avatar');
    if (fileNameDisplay && avatarInput && !avatarInput.files.length && !state.personalInfo.avatar) {
        fileNameDisplay.textContent = translate('file-name-display-none');
    }
    
    const langSelector = document.getElementById('lang-switch');
    if (langSelector) langSelector.value = state.settings.language;
}

// 언어 변경 시 상태 갱신 후 화면 전체(UI 및 미리보기) 재렌더링
function switchLanguage(langCode) {
    state.settings.language = langCode;
    saveData();
    translateStaticUI();
    renderDynamicInputs();
    updatePreview();
}

// --- 5. DYNAMIC SECTION MANAGEMENT (동적 입력칸 추가/삭제 관리) ---
// 각 섹션 배열에 빈 객체를 추가/삭제한 후 폼을 다시 그립니다.
function addWorkExperience() { state.workExperience.push({ company: '', role: '', duration: '', desc: '' }); renderDynamicInputs(); saveData(); updatePreview(); }
function removeWorkExperience(index) { state.workExperience.splice(index, 1); renderDynamicInputs(); saveData(); updatePreview(); }
function addEducation() { state.education.push({ school: '', degree: '', duration: '', desc: '' }); renderDynamicInputs(); saveData(); updatePreview(); }
function removeEducation(index) { state.education.splice(index, 1); renderDynamicInputs(); saveData(); updatePreview(); }
function addProject() { state.projects.push({ title: '', link: '', desc: '' }); renderDynamicInputs(); saveData(); updatePreview(); }
function removeProject(index) { state.projects.splice(index, 1); renderDynamicInputs(); saveData(); updatePreview(); }

// 현재 상태(배열 데이터)를 바탕으로 HTML 입력 폼 요소들을 생성하여 화면에 주입
function renderDynamicInputs() {
    const renderSection = (containerId, items, type, fieldsConfig) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        
        items.forEach((item, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'dynamic-item';
            wrapper.dataset.type = type;
            wrapper.dataset.index = index;

            let fieldsHtml = `<button type="button" class="btn-remove-item" onclick="window.removeDynamicItemSelector('${type}', ${index})">✕</button><div class="form-grid">`;
            
            fieldsConfig.forEach(field => {
                const isFullWidth = field.tag === 'textarea' ? 'full-width' : '';
                const fieldValue = item[field.name] || '';
                const fieldLabel = translate(field.labelKey);
                const fieldPlaceholder = translate(field.placeholderKey);
                
                fieldsHtml += `<div class="form-group ${isFullWidth}"><label>${fieldLabel}</label>`;
                fieldsHtml += field.tag === 'textarea' 
                    ? `<textarea rows="2" name="${field.name}" placeholder="${fieldPlaceholder}">${fieldValue}</textarea>`
                    : `<input type="text" name="${field.name}" placeholder="${fieldPlaceholder}" value="${fieldValue}">`;
                fieldsHtml += `</div>`;
            });
            fieldsHtml += `</div>`;
            wrapper.innerHTML = fieldsHtml;
            container.appendChild(wrapper);
        });
    };

    renderSection('experience-container', state.workExperience, 'experience', [
        { name: 'company', tag: 'input', labelKey: 'lblCompany', placeholderKey: 'phCompany' },
        { name: 'role', tag: 'input', labelKey: 'lblRole', placeholderKey: 'phRole' },
        { name: 'duration', tag: 'input', labelKey: 'lblDuration', placeholderKey: 'phDuration' },
        { name: 'desc', tag: 'textarea', labelKey: 'lblDesc', placeholderKey: 'phDesc' }
    ]);
    renderSection('education-container', state.education, 'education', [
        { name: 'school', tag: 'input', labelKey: 'lblSchool', placeholderKey: 'phSchool' },
        { name: 'degree', tag: 'input', labelKey: 'lblDegree', placeholderKey: 'phDegree' },
        { name: 'duration', tag: 'input', labelKey: 'lblGraduation', placeholderKey: 'phGraduation' },
        { name: 'desc', tag: 'textarea', labelKey: 'lblEduDetails', placeholderKey: 'phEduDetails' }
    ]);
    renderSection('projects-container', state.projects, 'project', [
        { name: 'title', tag: 'input', labelKey: 'lblProjName', placeholderKey: 'phProjName' },
        { name: 'link', tag: 'input', labelKey: 'lblProjLink', placeholderKey: 'phProjLink' },
        { name: 'desc', tag: 'textarea', labelKey: 'lblProjDesc', placeholderKey: 'phProjDesc' }
    ]);
}

// ✕ 버튼 클릭 시 호출되는 전역 삭제 헬퍼 함수
window.removeDynamicItemSelector = (type, index) => {
    if (type === 'experience') removeWorkExperience(index);
    if (type === 'education') removeEducation(index);
    if (type === 'project') removeProject(index);
};

// --- 6. LIVE PREVIEW RENDER STREAM (실시간 미리보기 렌더링 엔진) ---
// 입력된 모든 데이터를 모아 우측의 A4 규격 이력서 HTML 문자열을 조립합니다.
function updatePreview() {
    const outputContainer = document.getElementById('output-resume-content');
    if (!outputContainer) return;
    
    // 데이터 입력 여부 확인
    const info = state.personalInfo;
    const hasData = info.fullname || info.title || info.email || info.phone || info.summary || 
                    state.workExperience.length || state.education.length || state.projects.length ||
                    state.skills.techSkills || state.skills.softSkills || state.additional;

    // 데이터가 없으면 안내 문구 표시
    if (!hasData) {
        outputContainer.innerHTML = `<div class="preview-placeholder"><p>${translate('previewPlaceholderText')}</p></div>`;
        return;
    }

    // 스킬 문자열을 칩(Chips) 형태의 HTML로 변환하는 함수
    const formatSkills = (skillStr) => skillStr ? skillStr.split(',').map(s => `<span>${s.trim()}</span>`).join('') : '';

    // 연락처 정보 수집 및 조립
    let contactItems = [];
    if (info.phone) contactItems.push(`<span>${translate('lblPhonePrefix')}${info.phone}</span>`);
    if (info.email) contactItems.push(`<span>${translate('lblEmailPrefix')}${info.email}</span>`);
    if (info.location) contactItems.push(`<span>${translate('lblLocationPrefix')}${info.location}</span>`);
    if (info.linkedin) contactItems.push(`<span>${translate('lblLinkedinPrefix')}${info.linkedin}</span>`);
    if (info.portfolio) contactItems.push(`<span>${translate('lblPortfolioPrefix')}${info.portfolio}</span>`);
    if (info.website) contactItems.push(`<span>${translate('lblWebsitePrefix')}${info.website}</span>`);

    // 이름, 타이틀, 연락처가 포함된 상단 헤더 조립
    const headerHtml = `
        <header class="resume-header">
            ${info.avatar ? `<img src="${info.avatar}" class="preview-avatar" alt="${info.fullname}">` : ''}
            <div>
                <h1>${info.fullname || ''}</h1>
                <h2>${info.title || ''}</h2>
                ${contactItems.length > 0 ? `<div class="contact-strip">${contactItems.join('')}</div>` : ''}
            </div>
        </header>`;

    // 요약(Summary) 섹션 조립
    const summaryHtml = info.summary ? `<section class="preview-section"><h2 class="section-title">${translate('summary')}</h2><p class="item-desc" style="white-space: pre-line;">${info.summary}</p></section>` : '';

    // 경력(Experience) 섹션 조립
    let expHtml = '';
    if (state.workExperience.length > 0) {
        let items = '';
        state.workExperience.forEach(item => {
            if (!item.company && !item.role && !item.duration && !item.desc) return;
            items += `<article class="experience-item"><div class="item-meta"><h3><strong>${item.role || ''}</strong></h3><span>${item.duration || ''}</span></div>${item.company ? `<div class="item-sub"><span>${item.company}</span></div>` : ''}${item.desc ? `<p class="item-desc" style="white-space: pre-line;">${item.desc}</p>` : ''}</article>`;
        });
        if (items) expHtml = `<section class="preview-section"><h2 class="section-title">${translate('experience')}</h2>${items}</section>`;
    }

    // 학력(Education) 섹션 조립
    let eduHtml = '';
    if (state.education.length > 0) {
        let items = '';
        state.education.forEach(item => {
            if (!item.school && !item.degree && !item.duration && !item.desc) return;
            items += `<article class="education-item"><div class="item-meta"><h3><strong>${item.degree || ''}</strong></h3><span>${item.duration || ''}</span></div>${item.school ? `<div class="item-sub"><span>${item.school}</span></div>` : ''}${item.desc ? `<p class="item-desc" style="white-space: pre-line;">${item.desc}</p>` : ''}</article>`;
        });
        if (items) eduHtml = `<section class="preview-section"><h2 class="section-title">${translate('education')}</h2>${items}</section>`;
    }

    // 스킬(Skills) 섹션 조립
    let skillsHtml = '';
    if (state.skills.techSkills || state.skills.softSkills) {
        let blocks = '';
        if (state.skills.techSkills) blocks += `<div class="skills-block"><strong>${translate('previewTech')}</strong> <div class="skills-chips" style="display:inline-flex; gap:5px; flex-wrap:wrap; margin-left:5px;">${formatSkills(state.skills.techSkills)}</div></div>`;
        if (state.skills.softSkills) blocks += `<div class="skills-block"><strong>${translate('previewSoft')}</strong> <div class="skills-chips" style="display:inline-flex; gap:5px; flex-wrap:wrap; margin-left:5px;">${formatSkills(state.skills.softSkills)}</div></div>`;
        if (blocks) skillsHtml = `<section class="preview-section"><h2 class="section-title">${translate('skills')}</h2><div class="skills-grid">${blocks}</div></section>`;
    }

    // 프로젝트(Projects) 섹션 조립
    let projHtml = '';
    if (state.projects.length > 0) {
        let items = '';
        state.projects.forEach(item => {
            if (!item.title && !item.link && !item.desc) return;
            items += `<article class="project-item" style="margin-bottom: 10px;"><div class="item-meta"><h3><strong>${item.title || ''}</strong></h3>${item.link ? `<small style="font-weight:normal; color:var(--primary); margin-left:8px;">${item.link}</small>` : ''}</div>${item.desc ? `<p class="item-desc" style="white-space: pre-line; margin-top:2px; font-size:9.5pt;">${item.desc}</p>` : ''}</article>`;
        });
        if (items) projHtml = `<section class="preview-section"><h2 class="section-title">${translate('projects')}</h2>${items}</section>`;
    }

    // 기타 부가정보, 자격증, 수상내역 등을 모아서 하나의 섹션으로 조립
    let additionalHtml = '';
    let metaBlocksHtml = '';
    if (state.languagesCerts.languages) metaBlocksHtml += `<p><strong>${translate('previewLang')}</strong> ${state.languagesCerts.languages}</p>`;
    if (state.languagesCerts.certifications) metaBlocksHtml += `<p><strong>${translate('previewCert')}</strong> ${state.languagesCerts.certifications}</p>`;
    if (state.awardsVolunteer.awards) metaBlocksHtml += `<p><strong>${translate('previewAwards')}</strong> ${state.awardsVolunteer.awards}</p>`;
    if (state.awardsVolunteer.volunteer) metaBlocksHtml += `<p><strong>${translate('previewVol')}</strong> ${state.awardsVolunteer.volunteer}</p>`;
    if (state.additional) metaBlocksHtml += `<p><strong>${translate('previewInterests')}</strong> ${state.additional}</p>`;

    if (metaBlocksHtml) additionalHtml = `<section class="preview-section"><h2 class="section-title">${translate('additional')}</h2><div class="item-desc" style="font-size:9.5pt; line-height:1.5;">${metaBlocksHtml}</div></section>`;

    // 현재 선택된 템플릿 종류에 따라 최종 레이아웃 구조를 결정하여 삽입
    if (state.settings.template === 'creative-minimal') {
        outputContainer.innerHTML = `
            <aside class="sidebar">
                ${info.avatar ? `<img src="${info.avatar}" class="preview-avatar" style="float:none; display:block; margin:0 0 15px 0; width:80px; height:80px;" alt="${info.fullname}">` : ''}
                <h1>${info.fullname || ''}</h1>
                <h2>${info.title || ''}</h2>
                ${contactItems.length > 0 ? `<div class="contact-info" style="font-size:8.5pt; display:flex; flex-direction:column; gap:6px; margin-bottom:20px; color:#cbd5e1;">${contactItems.join('')}</div>` : ''}
                ${skillsHtml ? `<div class="sidebar-skills" style="margin-top:20px;">${skillsHtml}</div>` : ''}
                ${additionalHtml ? `<div class="sidebar-addition" style="margin-top:20px;">${additionalHtml}</div>` : ''}
            </aside>
            <div class="main-content">${summaryHtml}${expHtml}${projHtml}${eduHtml}</div>
        `;
    } else {
        outputContainer.innerHTML = headerHtml + summaryHtml + expHtml + projHtml + eduHtml + skillsHtml + additionalHtml;
    }
}

// --- 7. LOCALSTORAGE CONTROL (데이터 자동 저장 및 복구) ---
// 전체 데이터를 문자열로 변환하여 브라우저 로컬 캐시에 저장
function saveData() { localStorage.setItem('production_cv_builder_state', JSON.stringify(state)); }

// 캐시에 저장된 데이터를 꺼내서 에디터 폼(input)의 값을 채워 넣기
function loadData() {
    const cachedJsonString = localStorage.getItem('production_cv_builder_state');
    if (cachedJsonString) {
        try {
            Object.assign(state, JSON.parse(cachedJsonString));
            const bindValue = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
            
            bindValue('input-fullname', state.personalInfo.fullname);
            bindValue('input-title', state.personalInfo.title);
            bindValue('input-phone', state.personalInfo.phone);
            bindValue('input-email', state.personalInfo.email);
            bindValue('input-location', state.personalInfo.location);
            bindValue('input-linkedin', state.personalInfo.linkedin);
            bindValue('input-portfolio', state.personalInfo.portfolio);
            bindValue('input-website', state.personalInfo.website);
            bindValue('input-summary', state.personalInfo.summary);
            
            bindValue('input-tech-skills', state.skills.techSkills);
            bindValue('input-soft-skills', state.skills.softSkills);
            bindValue('input-languages', state.languagesCerts.languages);
            bindValue('input-certifications', state.languagesCerts.certifications);
            bindValue('input-awards', state.awardsVolunteer.awards);
            bindValue('input-volunteer', state.awardsVolunteer.volunteer);
            bindValue('input-additional', state.additional);

            // 파일명 표시 복구
            const fileNameDisplay = document.getElementById('file-name-display');
            if (fileNameDisplay) fileNameDisplay.textContent = state.personalInfo.avatar ? "✔ image_loaded.png" : translate('file-name-display-none');

            // 옵션 선택값 복구
            if(document.getElementById('template-select')) document.getElementById('template-select').value = state.settings.template;
            if(document.getElementById('lang-switch')) document.getElementById('lang-switch').value = state.settings.language;
        } catch (error) { console.error(error); }
    }
}

// --- 8. UTILITIES & CONFIGURATIONS (기능 설정 및 유틸리티) ---
// 다크모드 켜고 끄기 기능
function toggleDarkMode() { state.settings.darkMode = !state.settings.darkMode; applySettings(); saveData(); }

// 설정된 테마(라이트/다크)와 템플릿 CSS 클래스를 HTML 요소에 적용
function applySettings() {
    document.documentElement.setAttribute('data-theme', state.settings.darkMode ? 'dark' : 'light');
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.setAttribute('aria-pressed', state.settings.darkMode);
        themeToggleBtn.innerHTML = state.settings.darkMode ? '<span class="mode-icon" aria-hidden="true">☀️</span> Light Mode' : '<span class="mode-icon" aria-hidden="true">🌙</span> Dark Mode';
    }
    const targetPreviewFrame = document.getElementById('resume-preview');
    if (targetPreviewFrame) targetPreviewFrame.className = `a4-page template-${state.settings.template}`;
}

// 템플릿 종류(Modern, Classic 등) 변경 시 저장 및 화면 갱신
function switchTemplate(templateId) { state.settings.template = templateId; applySettings(); saveData(); updatePreview(); }

// --- 9. EXPORT PIPELINES (데이터 내보내기/가져오기 기능) ---
// 작성된 데이터를 안전하게 보관하기 위해 JSON 파일로 다운로드
function exportJSON() {
    const stringifiedData = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([stringifiedData], { type: 'application/json' });
    const allocationUrl = URL.createObjectURL(dataBlob);
    const operationalAnchorNode = document.createElement('a');
    operationalAnchorNode.href = allocationUrl;
    operationalAnchorNode.download = `resume-${state.personalInfo.fullname || 'data'}.json`;
    document.body.appendChild(operationalAnchorNode);
    operationalAnchorNode.click();
    document.body.removeChild(operationalAnchorNode);
    URL.revokeObjectURL(allocationUrl);
}

// 백업된 JSON 파일을 불러와서 데이터를 에디터에 복원
function importJSON(event) {
    const fileReference = event.target.files[0];
    if (!fileReference) return;
    const streamReader = new FileReader();
    streamReader.onload = (e) => {
        try {
            Object.assign(state, JSON.parse(e.target.result));
            saveData(); translateStaticUI(); renderDynamicInputs(); applySettings(); updatePreview(); loadData();
        } catch (err) { alert("Malformed JSON backup structure rejected."); }
    };
    streamReader.readAsText(fileReference);
}

// html2pdf 라이브러리를 사용해 이력서 미리보기를 고화질 PDF로 변환하여 다운로드
function exportToPDF() {
    const capturedTargetNode = document.getElementById('resume-preview');
    if (!capturedTargetNode) return;
    const configurationOptions = {
        margin: 0, filename: `resume-${state.personalInfo.fullname || 'download'}.pdf`,
        image: { type: 'jpeg', quality: 1 }, html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    if (typeof html2pdf !== 'undefined') html2pdf().set(configurationOptions).from(capturedTargetNode).save();
    else window.print();
}

/* ==========================================================================
   10. AI RESUME ASSISTANT
   ========================================================================== */

let latestAIResult = null;
const AI_API_BASE_URL = window.AI_API_BASE_URL || 'http://localhost:3000';

function aiEl(id) { return document.getElementById(id); }
function aiEscape(value) {
    return String(value ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}
function setAIStatus(type, message) {
    const status = aiEl('ai-status');
    const text = aiEl('ai-status-text');
    if (!status || !text) return;
    status.classList.remove('loading','error');
    if (type === 'loading') status.classList.add('loading');
    if (type === 'error') status.classList.add('error');
    text.textContent = message;
}
function setAILoading(isLoading) {
    const loading = aiEl('ai-loading');
    const button = aiEl('btn-ai-analyze');
    if (loading) loading.hidden = !isLoading;
    if (button) {
        button.disabled = isLoading;
        button.textContent = isLoading ? '⏳ Analyzing...' : '🤖 Analyze My Resume';
    }
    if (isLoading) setAIStatus('loading','Analyzing');
}
function renderAIList(id, items) {
    const el = aiEl(id); if (!el) return;
    el.innerHTML = Array.isArray(items) && items.length
        ? items.map(x => `<li>${aiEscape(x)}</li>`).join('')
        : '<li>No specific recommendations.</li>';
}
function renderAIKeywords(id, items) {
    const el = aiEl(id); if (!el) return;
    el.innerHTML = Array.isArray(items) && items.length
        ? items.map(x => `<span>${aiEscape(x)}</span>`).join('')
        : '<span>No items</span>';
}
function renderAISummary(result) {
    const s = result?.summaryImprovement || {};
    if (aiEl('ai-summary-current')) aiEl('ai-summary-current').textContent = s.current || state.personalInfo.summary || 'No current summary.';
    if (aiEl('ai-summary-improved')) aiEl('ai-summary-improved').textContent = s.improved || 'No improvement generated.';
    if (aiEl('ai-summary-reason')) aiEl('ai-summary-reason').textContent = s.reason || '';
}
function renderAIExperience(result) {
    const container = aiEl('ai-experience-improvements'); if (!container) return;
    const list = Array.isArray(result?.experienceImprovements) ? result.experienceImprovements : [];
    container.innerHTML = list.length ? list.map(item => {
        const index = Number(item.index);
        return `<div class="ai-mini-card">
            <div class="ai-mini-card-header">
                <div><h4>${aiEscape(item.company || state.workExperience?.[index]?.company || 'Experience')}</h4><small>${aiEscape(item.role || state.workExperience?.[index]?.role || '')}</small></div>
                <button type="button" class="btn btn-ai-apply" onclick="applyAIExperience(${index})">Apply</button>
            </div>
            <div class="ai-mini-current"><span class="ai-mini-label">Current</span><p>${aiEscape(item.current || '')}</p></div>
            <div class="ai-mini-improved"><span class="ai-mini-label">AI Improved</span><p>${aiEscape(item.improved || '')}</p></div>
            ${item.reason ? `<p class="ai-reason">${aiEscape(item.reason)}</p>` : ''}
        </div>`;
    }).join('') : '<p>No experience improvements were identified.</p>';
}
function renderAIProjects(result) {
    const container = aiEl('ai-project-improvements'); if (!container) return;
    const list = Array.isArray(result?.projectImprovements) ? result.projectImprovements : [];
    container.innerHTML = list.length ? list.map(item => {
        const index = Number(item.index);
        return `<div class="ai-mini-card">
            <div class="ai-mini-card-header">
                <div><h4>${aiEscape(item.title || state.projects?.[index]?.title || 'Project')}</h4></div>
                <button type="button" class="btn btn-ai-apply" onclick="applyAIProject(${index})">Apply</button>
            </div>
            <div class="ai-mini-current"><span class="ai-mini-label">Current</span><p>${aiEscape(item.current || '')}</p></div>
            <div class="ai-mini-improved"><span class="ai-mini-label">AI Improved</span><p>${aiEscape(item.improved || '')}</p></div>
            ${item.reason ? `<p class="ai-reason">${aiEscape(item.reason)}</p>` : ''}
        </div>`;
    }).join('') : '<p>No project improvements were identified.</p>';
}
function renderAIResult(result) {
    latestAIResult = result;
    if (aiEl('ai-results')) aiEl('ai-results').hidden = false;
    const match = Number(result?.matchScore), ats = Number(result?.atsScore);
    if (aiEl('ai-match-score')) aiEl('ai-match-score').textContent = Number.isFinite(match) ? Math.max(0,Math.min(100,Math.round(match))) : '--';
    if (aiEl('ai-ats-score')) aiEl('ai-ats-score').textContent = Number.isFinite(ats) ? Math.max(0,Math.min(100,Math.round(ats))) : '--';
    if (aiEl('ai-overall-assessment')) aiEl('ai-overall-assessment').textContent = result?.overallAssessment || '';
    renderAIList('ai-strengths', result?.strengths);
    renderAIList('ai-weaknesses', result?.weaknesses);
    renderAIKeywords('ai-matching-keywords', result?.matchingKeywords);
    renderAIKeywords('ai-missing-keywords', result?.missingKeywords);
    renderAIList('ai-ats-recommendations', result?.atsRecommendations);
    renderAISummary(result);
    renderAIExperience(result);
    renderAIProjects(result);
    const skills = result?.skillsRecommendation || {};
    renderAIKeywords('ai-existing-skills', skills.existingRelevantSkills);
    renderAIKeywords('ai-highlight-skills', skills.skillsToHighlight);
    renderAIKeywords('ai-missing-skills', skills.skillsMissingFromResume);
    renderAIList('ai-final-recommendations', result?.finalRecommendations);
}
async function analyzeResumeWithAI() {
    const input = aiEl('job-description');
    if (!input) return;
    const jobDescription = input.value.trim();
    if (jobDescription.length < 30) {
        alert('Please paste a meaningful job description first.');
        input.focus(); return;
    }
    setAILoading(true);
    try {
        const response = await fetch(`${AI_API_BASE_URL}/api/ai/analyze`, {
            method:'POST', headers:{'Content-Type':'application/json'},
            body:JSON.stringify({resume:state, jobDescription})
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || !payload.success) throw new Error(payload.error || 'AI analysis failed.');
        renderAIResult(payload.data);
        setAIStatus('ready','Analysis complete');
    } catch (error) {
        console.error('AI Resume Analysis Error:', error);
        setAIStatus('error','Analysis failed');
        alert(error.message || 'Unable to analyze your resume.');
    } finally { setAILoading(false); }
}
function applyAISummary() {
    const improved = latestAIResult?.summaryImprovement?.improved;
    if (!improved) return;
    state.personalInfo.summary = improved;
    const input = aiEl('input-summary'); if (input) input.value = improved;
    saveData(); updatePreview();
    const button = aiEl('btn-apply-summary');
    if (button) { button.textContent='✓ Applied'; button.classList.add('applied'); setTimeout(()=>{button.textContent='Apply';button.classList.remove('applied');},1800); }
}
function applyAIExperience(index) {
    const item = latestAIResult?.experienceImprovements?.find(x => Number(x.index) === Number(index));
    if (!item?.improved || !state.workExperience?.[index]) return;
    state.workExperience[index].desc = item.improved;
    saveData(); renderDynamicInputs(); updatePreview(); renderAIExperience(latestAIResult);
}
function applyAIProject(index) {
    const item = latestAIResult?.projectImprovements?.find(x => Number(x.index) === Number(index));
    if (!item?.improved || !state.projects?.[index]) return;
    state.projects[index].desc = item.improved;
    saveData(); renderDynamicInputs(); updatePreview(); renderAIProjects(latestAIResult);
}
function clearAIResults() {
    if (aiEl('job-description')) aiEl('job-description').value='';
    if (aiEl('ai-results')) aiEl('ai-results').hidden=true;
    latestAIResult=null; setAIStatus('ready','Ready');
}
document.addEventListener('DOMContentLoaded', () => {
    aiEl('btn-ai-analyze')?.addEventListener('click', analyzeResumeWithAI);
    aiEl('btn-ai-clear')?.addEventListener('click', clearAIResults);
    aiEl('btn-apply-summary')?.addEventListener('click', applyAISummary);
});
window.applyAIExperience = applyAIExperience;
window.applyAIProject = applyAIProject;
window.analyzeResumeWithAI = analyzeResumeWithAI;

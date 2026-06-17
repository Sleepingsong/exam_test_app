/* PMP Mock Exam APP JavaScript - Modern Interactive Simulation Engine */

document.addEventListener('DOMContentLoaded', () => {
    // --- Application State ---
    let state = {
        questions: [],          // Raw questions loaded
        shuffledQuestions: [],  // Questions in presentation order
        answers: [],            // User selections (index-aligned with shuffledQuestions)
        flags: [],              // Bookmarks (index-aligned with shuffledQuestions)
        timeSpent: [],          // Seconds spent on each question
        currentIndex: 0,
        examMode: 'practice',   // 'practice' or 'exam'
        timerLimit: 75,         // Seconds per question
        timeLeft: 75,
        enableTimeoutLock: true,
        shuffleEnabled: false,
        quizActive: false,
        globalSeconds: 0,
        timerInterval: null,
        globalTimerInterval: null
    };

    // --- DOM Elements ---
    const launcherScreen = document.getElementById('launcher-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultsScreen = document.getElementById('results-screen');
    
    const modePractice = document.getElementById('mode-practice');
    const modeExam = document.getElementById('mode-exam');
    const modePracticeLabel = document.getElementById('mode-practice-label');
    const modeExamLabel = document.getElementById('mode-exam-label');
    
    const perQuestionTimerLimit = document.getElementById('per-question-timer-limit');
    const enableTimeOutLock = document.getElementById('enable-time-out-lock');
    const shuffleQuestions = document.getElementById('shuffle-questions');
    
    const btnLoadDefault = document.getElementById('btn-load-default');
    const jsonFileInput = document.getElementById('json-file-input');
    const dataStatusMsg = document.getElementById('data-status-msg');
    const btnStartQuiz = document.getElementById('btn-start-quiz');
    
    const globalTimer = document.getElementById('global-timer');
    const globalTimeVal = document.getElementById('global-time-val');
    
    const quizModeIndicator = document.getElementById('quiz-mode-indicator');
    const questionProgressText = document.getElementById('question-progress-text');
    const circularTimer = document.querySelector('.circular-timer');
    const timerProgress = document.getElementById('timer-progress');
    const timerText = document.getElementById('timer-text');
    
    const questionText = document.getElementById('question-text');
    const optionsList = document.getElementById('options-list');
    
    const explanationBox = document.getElementById('explanation-box');
    const explanationStatus = document.getElementById('explanation-status');
    const explanationText = document.getElementById('explanation-text');
    
    const btnPrevQuestion = document.getElementById('btn-prev-question');
    const btnFlagQuestion = document.getElementById('btn-flag-question');
    const btnNextQuestion = document.getElementById('btn-next-question');
    
    const navGrid = document.getElementById('nav-grid');
    const statAnsweredCount = document.getElementById('stat-answered-count');
    const statFlaggedCount = document.getElementById('stat-flagged-count');
    const btnSubmitExam = document.getElementById('btn-submit-exam');
    
    const resultRadialFg = document.getElementById('result-radial-fg');
    const resultPercentage = document.getElementById('result-percentage');
    const resultScoreFraction = document.getElementById('result-score-fraction');
    const resultStatusText = document.getElementById('result-status-text');
    
    const resAvgTime = document.getElementById('res-avg-time');
    const resCorrectCount = document.getElementById('res-correct-count');
    const resWrongCount = document.getElementById('res-wrong-count');
    const resSkippedCount = document.getElementById('res-skipped-count');
    
    const btnReviewAnswers = document.getElementById('btn-review-answers');
    const btnRestartExam = document.getElementById('btn-restart-exam');
    const reviewQuestionsSection = document.getElementById('review-questions-section');
    const reviewListContainer = document.getElementById('review-list-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // --- Media / Sound Effects (Simulated via AudioContext) ---
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playBeep(freq, type, duration) {
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch(e) {
            console.log("Audio not supported or blocked: ", e);
        }
    }

    function playSuccessSound() {
        playBeep(587.33, 'triangle', 0.15); // D5
        setTimeout(() => playBeep(880, 'triangle', 0.3), 100); // A5
    }

    function playErrorSound() {
        playBeep(220, 'sawtooth', 0.4); // A3
    }

    function playWarningSound() {
        playBeep(440, 'sine', 0.1); // A4
    }

    // --- Mode Cards Toggle UI ---
    modePractice.addEventListener('change', () => {
        modePracticeLabel.classList.add('active');
        modeExamLabel.classList.remove('active');
    });
    
    modeExam.addEventListener('change', () => {
        modeExamLabel.classList.add('active');
        modePracticeLabel.classList.remove('active');
    });

    // --- Loading JSON Data ---
    async function loadQuestionsData(url) {
        try {
            dataStatusMsg.textContent = "กำลังโหลดข้อสอบ...";
            dataStatusMsg.className = "status-msg";
            
            const response = await fetch(url);
            if (!response.ok) throw new Error("โหลดไฟล์ไม่สำเร็จ");
            const data = await response.json();
            
            setupQuizQuestions(data);
        } catch (e) {
            dataStatusMsg.textContent = "ล้มเหลว: ไม่สามารถอ่านข้อมูลข้อสอบได้";
            dataStatusMsg.className = "status-msg error";
            btnStartQuiz.classList.add('disabled');
        }
    }

    function setupQuizQuestions(data) {
        if (!Array.isArray(data) || data.length === 0) {
            dataStatusMsg.textContent = "ล้มเหลว: โครงสร้างไฟล์ข้อสอบไม่ถูกต้อง";
            dataStatusMsg.className = "status-msg error";
            btnStartQuiz.classList.add('disabled');
            return;
        }
        
        state.questions = data;
        dataStatusMsg.textContent = `โหลดข้อสอบสำเร็จทั้งหมด ${data.length} ข้อ พร้อมสอบแล้ว!`;
        dataStatusMsg.className = "status-msg success";
        btnStartQuiz.classList.remove('disabled');
    }

    // Default load from relative questions.json path on click
    btnLoadDefault.addEventListener('click', () => {
        loadQuestionsData('questions.json');
    });

    // File Upload Handler
    jsonFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(evt) {
            try {
                const data = JSON.parse(evt.target.result);
                setupQuizQuestions(data);
            } catch(err) {
                dataStatusMsg.textContent = "ล้มเหลว: รูปแบบไฟล์ JSON ไม่ถูกต้อง";
                dataStatusMsg.className = "status-msg error";
                btnStartQuiz.classList.add('disabled');
            }
        };
        reader.readAsText(file, "UTF-8");
    });

    // --- Quiz Start & Configuration ---
    btnStartQuiz.addEventListener('click', () => {
        if (btnStartQuiz.classList.contains('disabled')) return;
        
        // Config settings
        state.examMode = document.querySelector('input[name="exam-mode"]:checked').value;
        state.timerLimit = parseInt(perQuestionTimerLimit.value, 10) || 75;
        state.enableTimeoutLock = enableTimeOutLock.checked;
        state.shuffleEnabled = shuffleQuestions.checked;
        
        // Prepare questions order
        if (state.shuffleEnabled) {
            state.shuffledQuestions = [...state.questions].sort(() => Math.random() - 0.5);
        } else {
            state.shuffledQuestions = [...state.questions];
        }
        
        const qCount = state.shuffledQuestions.length;
        state.answers = new Array(qCount).fill(null);
        state.flags = new Array(qCount).fill(false);
        state.timeSpent = new Array(qCount).fill(0);
        state.currentIndex = 0;
        state.globalSeconds = 0;
        state.quizActive = true;
        
        // Switch view
        launcherScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        globalTimer.classList.remove('hidden');
        
        // Setup Badge Mode
        quizModeIndicator.textContent = state.examMode === 'practice' ? 'Practice Mode' : 'Exam Mode';
        quizModeIndicator.className = `badge ${state.examMode}`;
        
        generateNavigationGrid();
        loadQuestion(0);
        startGlobalTimer();
    });

    // --- Sidebar Grid Generation ---
    function generateNavigationGrid() {
        navGrid.innerHTML = '';
        state.shuffledQuestions.forEach((_, idx) => {
            const cell = document.createElement('div');
            cell.className = 'grid-item unanswered';
            cell.textContent = idx + 1;
            cell.id = `nav-cell-${idx}`;
            cell.addEventListener('click', () => {
                if (state.quizActive) {
                    saveTimeSpent();
                    loadQuestion(idx);
                }
            });
            navGrid.appendChild(cell);
        });
        updateSidebarStats();
    }

    function updateSidebarStats() {
        let answered = 0;
        let flagged = 0;
        
        state.shuffledQuestions.forEach((_, idx) => {
            const cell = document.getElementById(`nav-cell-${idx}`);
            if (!cell) return;
            
            // Clean classes
            cell.className = 'grid-item';
            
            if (idx === state.currentIndex) {
                cell.classList.add('current');
            }
            
            if (state.answers[idx] !== null) {
                cell.classList.add('answered');
                answered++;
            } else if (state.flags[idx]) {
                cell.classList.add('flagged');
                flagged++;
            } else {
                cell.classList.add('unanswered');
            }
        });
        
        statAnsweredCount.textContent = `${answered}/${state.shuffledQuestions.length}`;
        statFlaggedCount.textContent = `${flagged}/${state.shuffledQuestions.length}`;
    }

    // --- Loading specific Question ---
    function loadQuestion(index) {
        state.currentIndex = index;
        const q = state.shuffledQuestions[index];
        
        // Update header info
        questionProgressText.textContent = `ข้อที่ ${index + 1} จาก ${state.shuffledQuestions.length}`;
        
        // Question markup text support
        questionText.textContent = q.question;
        
        // Render Options
        optionsList.innerHTML = '';
        q.options.forEach((opt) => {
            const letter = opt.substring(0, 1).toLowerCase(); // matches a, b, c, d
            const text = opt.substring(2).trim();
            
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.id = `option-${letter}`;
            btn.innerHTML = `<span class="option-letter">${letter.toUpperCase()}</span><span class="option-text">${text}</span>`;
            
            btn.addEventListener('click', () => handleOptionSelection(letter));
            optionsList.appendChild(btn);
        });
        
        // Load flag button state
        const flagBtn = document.getElementById('btn-flag-question');
        if (state.flags[index]) {
            flagBtn.classList.add('btn-primary');
            flagBtn.classList.remove('btn-outline');
        } else {
            flagBtn.classList.remove('btn-primary');
            flagBtn.classList.add('btn-outline');
        }
        
        // Load existing answer state and handle UI based on Mode
        const savedAnswer = state.answers[index];
        explanationBox.classList.add('hidden');
        
        if (savedAnswer !== null) {
            // Lock options
            lockOptions();
            
            if (state.examMode === 'practice') {
                showPracticeFeedback(savedAnswer, q.correct_answer, q.explanation);
            } else {
                // Exam Mode: Just show selected
                const selBtn = document.getElementById(`option-${savedAnswer}`);
                if (selBtn) selBtn.classList.add('selected');
            }
        }
        
        // Set up countdown timer for this question
        resetQuestionTimer();
        updateSidebarStats();
        
        // Button visibility
        btnPrevQuestion.classList.toggle('disabled', index === 0);
        
        if (index === state.shuffledQuestions.length - 1) {
            btnNextQuestion.textContent = "ข้ามข้อสุดท้าย";
        } else {
            btnNextQuestion.innerHTML = `ข้ามข้อนี้ <svg class="icon" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>`;
        }
    }

    function lockOptions() {
        const optionBtns = optionsList.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => btn.classList.add('locked'));
    }

    // --- Handles User Click on Option ---
    function handleOptionSelection(letter) {
        const idx = state.currentIndex;
        if (state.answers[idx] !== null) return; // Locked already
        
        state.answers[idx] = letter;
        saveTimeSpent();
        lockOptions();
        
        const q = state.shuffledQuestions[idx];
        
        if (state.examMode === 'practice') {
            // Stop timer instantly on answer
            stopQuestionTimer();
            
            // Show Feedback Visuals
            showPracticeFeedback(letter, q.correct_answer, q.explanation);
            
            // Play Beep
            if (q.correct_answer.split('').includes(letter)) {
                playSuccessSound();
            } else {
                playErrorSound();
            }
        } else {
            // Exam Mode: Just mark selected and keep running or show selection
            const selBtn = document.getElementById(`option-${letter}`);
            if (selBtn) selBtn.classList.add('selected');
            
            // Automatically advance to next after 200ms for smooth speed
            setTimeout(() => {
                if (state.currentIndex < state.shuffledQuestions.length - 1 && state.currentIndex === idx) {
                    loadQuestion(state.currentIndex + 1);
                }
            }, 250);
        }
        
        updateSidebarStats();
    }

    function showPracticeFeedback(selected, correct, explanation) {
        // Highlight correct/incorrect option cards
        const correctLetters = correct.split('');
        const isSelectedCorrect = correctLetters.includes(selected);
        
        const selectedBtn = document.getElementById(`option-${selected}`);
        if (selectedBtn) {
            if (isSelectedCorrect) {
                selectedBtn.classList.add('correct');
            } else {
                selectedBtn.classList.add('incorrect');
            }
        }
        
        // Highlight correct answers that were not selected (or all correct if selected is wrong)
        correctLetters.forEach(letter => {
            if (letter !== selected) {
                const btn = document.getElementById(`option-${letter}`);
                if (btn) btn.classList.add('unanswered-correct');
            }
        });
        
        if (isSelectedCorrect) {
            explanationStatus.textContent = "ถูกต้อง";
            explanationStatus.className = "explanation-badge correct";
        } else {
            explanationStatus.textContent = "คำตอบที่ถูกคือ " + correct.toUpperCase().split('').join(', ');
            explanationStatus.className = "explanation-badge incorrect";
        }
        
        // Show explanation
        explanationText.textContent = explanation || "ไม่มีคำอธิบายสำหรับคำถามข้อนี้";
        explanationBox.classList.remove('hidden');
    }

    // --- Flag / Bookmark Question ---
    btnFlagQuestion.addEventListener('click', () => {
        const idx = state.currentIndex;
        state.flags[idx] = !state.flags[idx];
        
        if (state.flags[idx]) {
            btnFlagQuestion.classList.add('btn-primary');
            btnFlagQuestion.classList.remove('btn-outline');
        } else {
            btnFlagQuestion.classList.remove('btn-primary');
            btnFlagQuestion.classList.add('btn-outline');
        }
        updateSidebarStats();
    });

    // --- Next & Prev Navigation ---
    btnPrevQuestion.addEventListener('click', () => {
        if (state.currentIndex > 0) {
            saveTimeSpent();
            loadQuestion(state.currentIndex - 1);
        }
    });

    btnNextQuestion.addEventListener('click', () => {
        saveTimeSpent();
        if (state.currentIndex < state.shuffledQuestions.length - 1) {
            loadQuestion(state.currentIndex + 1);
        } else {
            // End of quiz, focus to sidebar submit
            btnSubmitExam.focus();
            playBeep(600, 'sine', 0.25);
        }
    });

    // --- Timers Logic ---
    function startGlobalTimer() {
        if (state.globalTimerInterval) clearInterval(state.globalTimerInterval);
        state.globalTimerInterval = setInterval(() => {
            state.globalSeconds++;
            
            // Format to hh:mm:ss
            const hrs = Math.floor(state.globalSeconds / 3600).toString().padStart(2, '0');
            const mins = Math.floor((state.globalSeconds % 3600) / 60).toString().padStart(2, '0');
            const secs = (state.globalSeconds % 60).toString().padStart(2, '0');
            
            globalTimeVal.textContent = `${hrs}:${mins}:${secs}`;
        }, 1000);
    }

    function resetQuestionTimer() {
        stopQuestionTimer();
        
        // If already answered in Practice Mode, do not run timer
        if (state.examMode === 'practice' && state.answers[state.currentIndex] !== null) {
            timerText.textContent = "-";
            timerProgress.style.strokeDasharray = "100, 100";
            circularTimer.className = "circular-timer";
            return;
        }

        state.timeLeft = state.timerLimit;
        timerText.textContent = state.timeLeft;
        circularTimer.className = "circular-timer";
        
        state.timerInterval = setInterval(() => {
            state.timeLeft--;
            timerText.textContent = state.timeLeft;
            
            // Time ratio for circular SVG
            const strokeDash = (state.timeLeft / state.timerLimit) * 100;
            timerProgress.style.strokeDasharray = `${strokeDash}, 100`;
            
            // Class triggers for warnings
            if (state.timeLeft <= 15 && state.timeLeft > 5) {
                circularTimer.className = "circular-timer warning";
                if (state.timeLeft % 2 === 0) playWarningSound();
            } else if (state.timeLeft <= 5 && state.timeLeft > 0) {
                circularTimer.className = "circular-timer danger";
                playWarningSound();
            } else if (state.timeLeft <= 0) {
                handleQuestionTimeout();
            }
        }, 1000);
    }

    function stopQuestionTimer() {
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
    }

    function handleQuestionTimeout() {
        stopQuestionTimer();
        playErrorSound();
        
        const idx = state.currentIndex;
        if (state.enableTimeoutLock) {
            state.answers[idx] = "timeout"; // special key for timeout/skipped
            lockOptions();
            
            if (state.examMode === 'practice') {
                const q = state.shuffledQuestions[idx];
                showPracticeFeedback("timeout", q.correct_answer, q.explanation);
            } else {
                // Exam Mode: Automatically jump to next after timeout
                setTimeout(() => {
                    if (state.currentIndex < state.shuffledQuestions.length - 1 && state.currentIndex === idx) {
                        loadQuestion(state.currentIndex + 1);
                    }
                }, 1000);
            }
            updateSidebarStats();
        }
    }

    function saveTimeSpent() {
        // Record seconds spent
        if (state.timerLimit && state.timeLeft) {
            const spent = state.timerLimit - state.timeLeft;
            state.timeSpent[state.currentIndex] += Math.max(0, spent);
        }
    }

    // --- Submit Paper & Results ---
    btnSubmitExam.addEventListener('click', () => {
        const unansweredCount = state.answers.filter(ans => ans === null).length;
        let confirmMsg = "คุณแน่ใจหรือไม่ที่จะส่งคำตอบข้อสอบทั้งหมด?";
        if (unansweredCount > 0) {
            confirmMsg = `คุณยังไม่ได้ทำข้อสอบอีก ${unansweredCount} ข้อ! ยืนยันที่จะส่งคำตอบทั้งหมดหรือไม่?`;
        }
        
        if (confirm(confirmMsg)) {
            endQuizAndProcessResults();
        }
    });

    function endQuizAndProcessResults() {
        state.quizActive = false;
        stopQuestionTimer();
        if (state.globalTimerInterval) clearInterval(state.globalTimerInterval);
        
        // Hide quiz, show results
        quizScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        globalTimer.classList.add('hidden');
        
        // Process stats
        let correct = 0;
        let wrong = 0;
        let skipped = 0;
        
        state.shuffledQuestions.forEach((q, idx) => {
            const ans = state.answers[idx];
            if (ans === null || ans === 'timeout') {
                skipped++;
            } else if (q.correct_answer.split('').includes(ans)) {
                correct++;
            } else {
                wrong++;
            }
        });
        
        const total = state.shuffledQuestions.length;
        const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
        
        // Target pass limit is 65% for PMP
        const isPass = percentage >= 65;
        
        // Visual circular display
        resultRadialFg.style.strokeDasharray = `${percentage}, 100`;
        resultPercentage.textContent = `${percentage}%`;
        resultScoreFraction.textContent = `${correct} / ${total} ข้อ`;
        
        resultStatusText.textContent = isPass ? "ผ่านเกณฑ์การทดสอบ" : "ไม่ผ่านเกณฑ์การทดสอบ";
        resultStatusText.className = `result-status-badge ${isPass ? 'pass' : 'fail'}`;
        
        // Detail values
        resCorrectCount.textContent = `${correct} ข้อ`;
        resWrongCount.textContent = `${wrong} ข้อ`;
        resSkippedCount.textContent = `${skipped} ข้อ`;
        
        // Average time spent (total spent / total questions)
        const totalSpent = state.timeSpent.reduce((a, b) => a + b, 0);
        const avg = total > 0 ? Math.round(totalSpent / total) : 0;
        resAvgTime.textContent = `${avg} วินาที`;
        
        // Reset review panel
        reviewQuestionsSection.classList.add('hidden');
        
        if (isPass) {
            playSuccessSound();
        } else {
            playErrorSound();
        }
    }

    // --- Results Review Setup ---
    btnReviewAnswers.addEventListener('click', () => {
        reviewQuestionsSection.classList.remove('hidden');
        renderReviewList('all');
        
        // Scroll to review section smoothly
        reviewQuestionsSection.scrollIntoView({ behavior: 'smooth' });
    });

    function renderReviewList(filter = 'all') {
        reviewListContainer.innerHTML = '';
        
        state.shuffledQuestions.forEach((q, idx) => {
            const selected = state.answers[idx];
            const isCorrect = q.correct_answer.split('').includes(selected);
            const isFlagged = state.flags[idx];
            
            // Filter evaluation
            if (filter === 'correct' && !isCorrect) return;
            if (filter === 'incorrect' && isCorrect && selected !== null && selected !== 'timeout') return;
            if (filter === 'flagged' && !isFlagged) return;
            
            // Create review card element
            const card = document.createElement('div');
            card.className = `review-card ${isCorrect ? 'correct-card' : 'incorrect-card'}`;
            
            let answerTextHtml = "";
            if (selected === 'timeout') {
                answerTextHtml = `<span class="badge" style="background-color: var(--color-error-glow); color: var(--color-error)">หมดเวลา / ข้ามข้อนี้</span>`;
            } else if (selected === null) {
                answerTextHtml = `<span class="badge" style="background-color: rgba(255,255,255,0.05); color: var(--text-secondary)">ไม่ได้ตอบ</span>`;
            } else {
                answerTextHtml = `ตอบ: <strong>${selected.toUpperCase()}</strong>`;
            }

            card.innerHTML = `
                <div class="review-card-header">
                     <div class="review-card-meta">
                        <span class="badge">ข้อที่ ${idx + 1}</span>
                        ${isCorrect ? 
                            '<span class="badge" style="background-color: var(--color-success-glow); color: var(--color-success)">ถูกต้อง</span>' : 
                            '<span class="badge" style="background-color: var(--color-error-glow); color: var(--color-error)">ผิดพลาด</span>'}
                        ${isFlagged ? '<span class="badge" style="background-color: var(--color-warning-glow); color: var(--color-warning)">ปักหมุดไว้</span>' : ''}
                    </div>
                    <div>
                        ${answerTextHtml}
                    </div>
                </div>
                <p class="review-card-question">${q.question}</p>
                <div class="review-options">
                    ${q.options.map(opt => {
                        const letter = opt.substring(0, 1).toLowerCase();
                        const optText = opt.substring(2).trim();
                        let optClass = 'review-option-item';
                        
                        if (q.correct_answer.split('').includes(letter)) {
                            optClass += ' correct';
                        } else if (letter === selected) {
                            optClass += ' chosen';
                        }
                        
                        return `<div class="${optClass}"><strong>${letter.toUpperCase()}</strong> - ${optText}</div>`;
                    }).join('')}
                </div>
                <div class="explanation-card" style="margin-bottom: 0;">
                    <div class="explanation-header">
                        <h4>คำอธิบาย</h4>
                    </div>
                    <p class="explanation-content">${q.explanation || 'ไม่มีคำอธิบายเพิ่มเติม'}</p>
                </div>
            `;
            
            reviewListContainer.appendChild(card);
        });
        
        if (reviewListContainer.children.length === 0) {
            reviewListContainer.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 3rem 0;">ไม่พบข้อสอบที่ตรงตามเงื่อนไขตัวกรอง</p>';
        }
    }

    // Filter Buttons listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderReviewList(e.target.dataset.filter);
        });
    });

    // --- Reset / Restart Exam ---
    btnRestartExam.addEventListener('click', () => {
        resultsScreen.classList.add('hidden');
        launcherScreen.classList.remove('hidden');
    });
});

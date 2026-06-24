$ErrorActionPreference = 'Stop'

param(
    [string]$InputFile = "questions.json",
    [string]$OutputFile = "questions.json"
)

$jsonText = Get-Content -Path $InputFile -Encoding UTF8 -Raw
$jsonText = $jsonText.TrimStart([char]0xFEFF)
$questions = $jsonText | ConvertFrom-Json

# Lightweight classifier for PMP exam domains and delivery approaches.
# It intentionally uses ASCII keywords so the script remains encoding-safe.
$peopleKeywords = @(
    "team", "leader", "stakeholder", "conflict", "negotiat", "resource",
    "communicat", "sponsor", "coach", "staff", "vendor", "virtual",
    "emotional intelligence", "facilitat", "servant", "scrum master"
)
$businessKeywords = @(
    "strateg", "value", "roi", "compliance", "regulat", "market",
    "organiz", "benefit", "vision", "external", "business", "customer",
    "product owner", "portfolio", "npv", "irr"
)
$processKeywords = @(
    "scope", "schedule", "cost", "risk", "quality", "procurement",
    "process", "tool", "technique", "wbs", "baseline", "critical path",
    "change request", "integrat", "charter", "requirements", "issue",
    "lessons learned", "control", "monitor", "estimate"
)

$adaptiveKeywords = @(
    "agile", "sprint", "scrum", "backlog", "iteration", "kanban",
    "product owner", "retrospective", "standup", "velocity", "user story",
    "increment", "adaptive", "hybrid", "mmf", "mvp", "spike"
)
$predictiveKeywords = @(
    "waterfall", "predictive", "traditional", "plan-driven", "phase",
    "project management plan", "change control", "baseline", "wbs",
    "critical path", "earned value"
)

function Get-KeywordScore {
    param(
        [string]$Text,
        [string[]]$Keywords
    )

    if ([string]::IsNullOrWhiteSpace($Text)) {
        return 0
    }

    $score = 0
    $normalizedText = $Text.ToLowerInvariant()
    foreach ($keyword in $Keywords) {
        $score += ([regex]::Matches($normalizedText, [regex]::Escape($keyword.ToLowerInvariant()))).Count
    }

    return $score
}

Write-Host "Classifying $($questions.Count) questions..."

foreach ($question in $questions) {
    $combinedText = "$($question.question) $($question.explanation)"
    foreach ($option in $question.options) {
        $combinedText += " $option"
    }

    $peopleScore = Get-KeywordScore $combinedText $peopleKeywords
    $businessScore = Get-KeywordScore $combinedText $businessKeywords
    $processScore = Get-KeywordScore $combinedText $processKeywords

    $domain = "Process"
    $maxDomainScore = $processScore

    if ($peopleScore -gt $maxDomainScore) {
        $domain = "People"
        $maxDomainScore = $peopleScore
    }

    if ($businessScore -gt $maxDomainScore) {
        $domain = "Business Environment"
    }

    $adaptiveScore = Get-KeywordScore $combinedText $adaptiveKeywords
    $predictiveScore = Get-KeywordScore $combinedText $predictiveKeywords
    $approach = if ($adaptiveScore -gt $predictiveScore) { "Adaptive" } else { "Predictive" }

    $question | Add-Member -MemberType NoteProperty -Name "domain" -Value $domain -Force
    $question | Add-Member -MemberType NoteProperty -Name "approach" -Value $approach -Force
}

$jsonOutput = $questions | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText(
    (Join-Path (Get-Location) $OutputFile),
    $jsonOutput,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host "Classification complete. Saved to $OutputFile."

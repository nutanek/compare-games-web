export function getPasswordStrengthScore(password: string): number {
    let score = 0;
    if (password.match(/[a-z]+/)) {
        score += 1;
    }
    if (password.match(/[A-Z]+/)) {
        score += 1;
    }
    if (password.match(/[0-9]+/)) {
        score += 1;
    }
    if (password.match(/[^A-Za-z0-9]+/)) {
        score += 1;
    }
    if (password.length > 0 && password.length < 8) {
        score = 1
    }
    return score;
}

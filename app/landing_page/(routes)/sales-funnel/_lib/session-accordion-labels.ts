type SessionAccordionLabels = {
    session: (number: number) => string;
    group: (start: number, end: number) => string;
};

const LABELS: Record<string, SessionAccordionLabels> = {
    english: {
        session: (number) => `Session ${number}`,
        group: (start, end) => `Sessions ${start}–${end}`,
    },
    portuguese: {
        session: (number) => `Sessão ${number}`,
        group: (start, end) => `Sessões ${start}–${end}`,
    },
    spanish: {
        session: (number) => `Sesión ${number}`,
        group: (start, end) => `Sesiones ${start}–${end}`,
    },
    french: {
        session: (number) => `Session ${number}`,
        group: (start, end) => `Sessions ${start}–${end}`,
    },
};

export function getSessionAccordionLabels(languageId: string): SessionAccordionLabels {
    return LABELS[languageId] ?? LABELS.english;
}

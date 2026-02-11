    /**
 * Preference memory: user-defined context (e.g. "casual cotton under 2000")
 * used to personalize similar-product recommendations via semantic search.
 * Resume: "Implemented LLM-backed preference memory for personalized recommendations."
 */
const KEY = "preferenceMemory";

export function getPreference() {
    try {
        const s = localStorage.getItem(KEY);
        return (s && s.trim()) || null;
    } catch (_) {
        return null;
    }
}

export function setPreference(text) {
    try {
        const s = (text && String(text).trim()) || "";
        if (s) localStorage.setItem(KEY, s);
        else localStorage.removeItem(KEY);
    } catch (_) {}
}

export function clearPreference() {
    try {
        localStorage.removeItem(KEY);
    } catch (_) {}
}

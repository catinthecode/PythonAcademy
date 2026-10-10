// Tiny hash router. Hash URLs (#/w/1/ch2) work on GitHub Pages with no server rewrites.
import { useEffect, useState } from 'react';

export function useRoute(): string[] {
    const [hash, setHash] = useState(() => window.location.hash);
    useEffect(() => {
        const onChange = () => {
            setHash(window.location.hash);
            window.scrollTo(0, 0);
        };
        window.addEventListener('hashchange', onChange);
        return () => window.removeEventListener('hashchange', onChange);
    }, []);
    return hash.replace(/^#\/?/, '').split('/').filter(Boolean);
}

export function href(...parts: (string | number)[]) {
    return '#/' + parts.join('/');
}

export function navigate(...parts: (string | number)[]) {
    window.location.hash = href(...parts);
}

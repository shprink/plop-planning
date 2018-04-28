type Time = [number, number];

const start: Time = [9, 0];
const end: Time = [19, 0];

const minIncr = 5;
const incr = (time: Time): Time => {
    const [hh, mm] = time;
    const [nmm, h] = [(mm + minIncr) % 60, ((mm + minIncr) / 60) | 0];
    const nhh = hh + h;
    return [nhh, nmm];
};

const timeCompare = (t1: Time, t2: Time): number => {
    const [h1, m1] = t1;
    const [h2, m2] = t2;
    if (h1 > h2) {
        return 1;
    } else if (h1 < h2) {
        return -1;
    } else if (m1 > m2) {
        return 1;
    } else if (m1 < m2) {
        return -1;
    } else {
        return 0;
    }
};

const range = (start: Time, end: Time): Time[] => {
    const result: Time[] = [];
    let current = start;
    do {
        result.push(current);
        current = incr(current);
    } while (timeCompare(current, end) <= 0);
    return result;
};

const displayTime = (time: Time): string => {
    const [h, m] = time;
    const hh = h > 9 ? `${h}` : `0${h}`;
    const mm = m > 9 ? `${m}` : `0${m}`;
    return `${hh}:${mm}`;
};

const values: Time[] = range(start, end);

const hours = `
<header></header>
<div class="content">
${values
    .map(t => `<div class="time ${(t[0] % 2 === 0) ? 'even' : 'odd'}">${displayTime(t)}</div>`)
    .join('\n')
    }
</div>`;

const addHours = (elt?: HTMLElement) => {
    const section = document.createElement('section');
    section.classList.add('times');
    section.innerHTML = hours;
    document.body.insertBefore(section, elt);
};

document.querySelectorAll('body > section').forEach(addHours);
addHours();


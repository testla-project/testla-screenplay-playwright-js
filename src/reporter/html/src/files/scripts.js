const getCount = (status) => report.executions.filter((execution) => execution.status === status).length;

const showCount = (status, element) => {
    const count = status === 'all' ? report.executions.length : getCount(status);
    const countElement = document.getElementById(element);
    countElement.innerText = count;
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'failed':
            return '❌';
        case 'skipped':
            return '⏭️';
        case 'interrupted':
            return '⏸️';
        case 'passed':
        default:
            return '✅';
    }
};

const formatDuration = (duration) => `${duration} ms`;

const createElement = (elem, options) => {
    const el = document.createElement(elem);
    if (options) {
        if (options.className) {
            el.className = options.className;
        }
        if (options.text) {
            el.innerText = options.text;
        }
        if (options.onclick) {
            el.onclick = options.onclick;
        }
        if (options.children) {
            options.children.forEach((child) => {
                el.appendChild(child);
            });
        }
    }
    return el;
};

const renderExecutions = (executions) => {
    const report = document.getElementById('report');
    const list = createElement('ul');
    const groupedExecutions = new Map();
    executions.forEach((execution) => {
        if (groupedExecutions.has(execution.suite)) {
            groupedExecutions.get(execution.suite).push(execution);
        } else {
            groupedExecutions.set(execution.suite, [execution]);
        }
    });
    groupedExecutions.forEach((executions, suite) => {
        const item = createElement('li', {
            className: 'collapsible',
            children: [
                createElement('header', {
                    onclick: () => {
                        item.classList.toggle('collapsed');
                    },
                    children: [
                        createElement('span', {
                            className: 'icon',
                            text: '▼',
                        }),
                        createElement('span', {
                            text: suite,
                        }),
                    ],
                }),
            ],
        });
        const sublist = createElement('ul', {
            className: 'content',
        });
        executions.forEach((execution) => {
            const subitem = createElement('li', {
                children: [
                    createElement('div', {
                        className: 'content',
                        children: [
                            createElement('div', {
                                className: 'status-icon',
                                text: getStatusIcon(execution.status),
                            }),
                            createElement('div', {
                                className: 'title',
                                text: execution.title,
                            }),
                            createElement('div', {
                                className: `project ${execution.project}`,
                                children: [
                                    createElement('div', {
                                        className: 'inner',
                                        text: execution.project,
                                    }),
                                ],
                            }),
                            createElement('div', {
                                className: 'duration',
                                text: formatDuration(execution.duration),
                            }),
                        ],
                    }),
                    createElement('div', {
                        className: 'location',
                        text: `${suite}:${execution.location.line}`,
                    }),
                ],
            });
            sublist.appendChild(subitem);
        });
        item.appendChild(sublist);
        list.appendChild(item);
    });
    report.innerHTML = '';
    report.append(list);
};

const displayFiltered = (status) => {
    const filteredExecutions = status === 'all' ? report.executions : report.executions.filter((execution) => execution.status === status);
    renderExecutions(filteredExecutions);
};

const onLoaded = () => {
    showCount('all', 'all-count');
    showCount('passed', 'passed-count');
    showCount('failed', 'failed-count');
    showCount('skipped', 'skipped-count');
    showCount('interrupted', 'interrupted-count');
    displayFiltered('all');
};

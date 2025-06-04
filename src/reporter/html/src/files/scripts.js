const getCount = (status) => report.executions.filter((execution) => execution.runs[execution.runs.length - 1].status === status).length;

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

const formatDuration = (duration) => {
    if (duration > 60 * 1000) {
        const min = Math.floor(duration / (60 * 1000));
        const sec = Math.floor((duration % (60 * 1000)) / 1000);
        return `${min}:${sec}m`;
    }
    if (duration > 1000) {
        const sec = Math.floor(duration / 1000);
        const ms = duration % 1000;
        return `${sec}.${`${ms}`.substring(0, 1)}s`;
    }
    if (duration > 0) {
        return `${duration}ms`;
    }
    return '0';
};

const createElement = (elem, options) => {
    const el = document.createElement(elem);
    if (options) {
        if (options.id) {
            el.id = options.id;
        }
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
        if (options.tooltip) {
            el.title = options.tooltip;
        }
    }
    return el;
};

const createListItem = ({
    status, project, onclick, title, duration, filePath, element = 'li', mayExpand = false, children = [],
}) => createElement(element, {
    onclick,
    className: `list-item${status ? '' : ' no-status'}`,
    children: [
        createElement('div', {
            className: 'content',
            children: [
                mayExpand ? createElement('div', {
                    text: '▶',
                    className: `expand-icon${children.length > 0 ? '' : ' hidden'}`,
                }) : createElement('div', { className: 'hidden' }),
                status ? createElement('div', {
                    className: 'status-icon',
                    text: getStatusIcon(status),
                }) : createElement('div', { className: 'hidden' }),
                createElement('div', {
                    className: 'title',
                    text: typeof title === 'string' ? title : undefined,
                    children: typeof title !== 'string' ? [title] : [],
                }),
                project ? createElement('div', {
                    className: `project ${project}`,
                    children: [
                        createElement('div', {
                            className: 'inner',
                            text: project,
                        }),
                    ],
                }) : createElement('div', { className: 'project' }),
                createElement('div', {
                    className: 'duration',
                    text: formatDuration(duration),
                }),
            ],
        }),
        filePath ? createElement('div', {
            className: 'location',
            text: filePath,
        }) : createElement('div'),
    ],
});

const renderActivityDetails = (details) => details.map((detail, idx) => {
    // if (!detail.parameters) {
    //     return createElement('div', { text: detail.methodName });
    // }
    // return `${detail.methodName}(${Object.entries(detail.parameters || {}).map(([, value]) => `${
    //     typeof value === 'object' || Array.isArray(value)
    //         ? JSON.stringify(value)
    //         : typeof value === 'string' ? `"${value}"` : value
    // }`).join(', ')})`;
    const parts = [];
    if (idx > 0) {
        parts.push(createElement('div', { text: '.' }));
    }
    parts.push(createElement('div', { text: detail.methodName }));
    if (detail.parameters) {
        const paramList = [];
        Object.entries(detail.parameters || {}).forEach(([, value], innerIdx) => {
            if (innerIdx > 0) {
                paramList.push(createElement('span', { text: ', ' }));
            }
            paramList.push(createElement('span', {
                text: typeof value === 'object' || Array.isArray(value)
                    ? undefined
                    : typeof value === 'string' ? `"${value}"` : value,
                children: typeof value === 'object' || Array.isArray(value)
                    ? [createElement('span', { className: 'tooltip', tooltip: JSON.stringify(value, undefined, 2), text: '▶ [object]' })]
                    : [],
            }));
        });
        parts.push(createElement('div', {
            children: [
                createElement('span', { text: '(' }),
                ...paramList,
                // ...Object.entries(detail.parameters || {}).map(([, value]) => createElement('span', {
                //     text: typeof value === 'object' || Array.isArray(value)
                //         ? undefined
                //         : typeof value === 'string' ? `"${value}"` : value,
                //     children: typeof value === 'object' || Array.isArray(value)
                //         ? [createElement('span', { className: 'tooltip', tooltip: JSON.stringify(value, undefined, 2), text: '▶ [object]' })]
                //         : [],
                // })),
                createElement('span', { text: ')' }),
            ],
        }));
        // return `${detail.methodName}(${Object.entries(detail.parameters || {}).map(([, value]) => `${
        //     typeof value === 'object' || Array.isArray(value)
        //         ? JSON.stringify(value)
        //         : typeof value === 'string' ? `"${value}"` : value
        // }`).join(', ')})`;
    }
    return createElement('div', { children: parts });
});

const createStepsList = (steps, isActive = false) => {
    const list = createElement('ul', {
        className: `steps-list${isActive ? ' active' : ''}`,
    });
    steps.forEach((step) => {
        const stepItem = createListItem({
            status: step.status,
            // project: execution.project,
            // onclick,
            // title: `${step.actor} ${step.activityAction} ${renderActivityDetails(step.activityDetails)}`,
            title: createElement('div', {
                className: 'wrapper',
                children: [
                    createElement('div', {
                        className: 'actor',
                        text: step.actor,
                    }),
                    createElement('div', {
                        className: 'activity-action',
                        text: step.activityAction,
                    }),
                    createElement('div', {
                        className: 'activity-details',
                        children: renderActivityDetails(step.activityDetails),
                    }),
                ],
            }),
            duration: step.duration,
            // suite: execution.suite,
            // location: step.location,
            filePath: step.filePath,
            mayExpand: true,
        });
        list.appendChild(stepItem);
    });
    return list;
};

const showExecutionDetails = (execution) => {
    console.log(execution);
    const content = document.getElementById('flyin-content');
    content.innerHTML = '';
    content.appendChild(createListItem({
        element: 'div',
        // status: execution.status,
        project: execution.project,
        // onclick,
        title: execution.title,
        // duration: execution.duration,
        duration: execution.runs.reduce((acc, run) => acc + run.duration, 0),
        // suite: execution.suite,
        // location: step.location,
        filePath: `${execution.suite}:${execution.location.line}`,
    }));
    const runDetails = createElement('div', { id: 'run-details' });
    const runList = createElement('ul', {
        className: 'run-list',
        children: execution.runs.map((run, runIdx) => createElement('li', {
            className: `run-list-item${runIdx === 0 ? ' active' : ''}`,
            text: `${getStatusIcon(run.status)} ${runIdx === 0 ? 'Run' : `Retry #${runIdx}`}`,
            onclick: () => {
                document.querySelector('.run-list-item.active').classList.remove('active');
                document.querySelector(`.run-list-item:nth-child(${runIdx + 1})`).classList.add('active');
                document.querySelector('.steps-list.active').classList.remove('active');
                document.querySelector(`.steps-list:nth-child(${runIdx + 1})`).classList.add('active');
            },
        })),
    });
    content.appendChild(runList);
    content.appendChild(runDetails);
    execution.runs.forEach((run, runIdx) => {
        console.log(run);
        const list = createStepsList(run.steps, runIdx === 0);
        runDetails.appendChild(list);
    });
    document.getElementById('flyin').classList.remove('collapsed');
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
            const subitem = createListItem({
                status: execution.runs[execution.runs.length - 1].status,
                project: execution.project,
                onclick: () => showExecutionDetails(execution),
                title: execution.title,
                // duration: execution.duration,
                duration: execution.runs.reduce((acc, run) => acc + run.duration, 0),
                filePath: `${execution.suite}:${execution.location.line}`,
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
    const filteredExecutions = status === 'all' ? report.executions : report.executions.filter((execution) => execution.runs[execution.runs.length - 1].status === status);
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

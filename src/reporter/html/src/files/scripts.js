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

const createListItem = ({
    status, project, onclick, title, duration, filePath,
}) => createElement('li', {
    onclick,
    className: 'list-item',
    children: [
        createElement('div', {
            className: 'content',
            children: [
                createElement('div', {
                    className: 'status-icon',
                    text: getStatusIcon(status),
                }),
                createElement('div', {
                    className: 'title',
                    text: title,
                }),
                project ? createElement('div', {
                    className: `project ${project}`,
                    children: [
                        createElement('div', {
                            className: 'inner',
                            text: project,
                        }),
                    ],
                }) : createElement('div'),
                createElement('div', {
                    className: 'duration',
                    text: formatDuration(duration),
                }),
            ],
        }),
        filePath ? createElement('div', {
            className: 'location',
            text: filePath,//`${suite}:${location.line}`,
        }) : createElement('div'),
    ],
});

const showExecutionDetails = (execution) => {
    console.log(execution);
    const content = document.getElementById('flyin-content');
    content.innerHTML = '';
    const list = createElement('ul');
    execution.steps.forEach((step) => {
        const stepItem = createListItem({
            status: step.status,
            // project: execution.project,
            // onclick,
            title: `${step.actor} ${step.activityAction} ${step.activityDetails}`,
            duration: step.duration,
            // suite: execution.suite,
            // location: step.location,
            filePath: step.filePath,
        });
        // const stepItem = createElement('div', {
        //     className: 'step',
        //     text: `${step.actor} ${step.activityAction} ${step.activityDetails}`,
        // });
        // console.log(stepItem);
        list.appendChild(stepItem);
        content.appendChild(list);
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
                status: execution.status,
                project: execution.project,
                onclick: () => showExecutionDetails(execution),
                title: execution.title,
                duration: execution.duration,
                // suite: execution.suite,
                // location: execution.location,
                filePath: `${execution.suite}:${execution.location.line}`,
            });
            // const subitem = createElement('li', {
            //     onclick: () => showExecutionDetails(execution),
            //     children: [
            //         createElement('div', {
            //             className: 'content',
            //             children: [
            //                 createElement('div', {
            //                     className: 'status-icon',
            //                     text: getStatusIcon(execution.status),
            //                 }),
            //                 createElement('div', {
            //                     className: 'title',
            //                     text: execution.title,
            //                 }),
            //                 createElement('div', {
            //                     className: `project ${execution.project}`,
            //                     children: [
            //                         createElement('div', {
            //                             className: 'inner',
            //                             text: execution.project,
            //                         }),
            //                     ],
            //                 }),
            //                 createElement('div', {
            //                     className: 'duration',
            //                     text: formatDuration(execution.duration),
            //                 }),
            //             ],
            //         }),
            //         createElement('div', {
            //             className: 'location',
            //             text: `${suite}:${execution.location.line}`,
            //         }),
            //     ],
            // });
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

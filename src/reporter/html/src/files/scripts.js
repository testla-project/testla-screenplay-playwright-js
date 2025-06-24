const reporter = {
    checkIsFlaky: (runs) => runs.length > 1 && runs[runs.length - 1].status === 'passed',
    getExecutionStatus: (execution) => (reporter.checkIsFlaky(execution.runs)
        ? 'flaky'
        : execution.runs[execution.runs.length - 1].status),
    getCount: (status) => reporter.report.executions.filter((execution) => {
        const runStatus = reporter.getExecutionStatus(execution);
        return runStatus === status;
    }).length,
    showCount: (status, element) => {
        const count = status === 'all' ? reporter.report.executions.length : reporter.getCount(status);
        const countElement = document.getElementById(element);
        countElement.innerText = count;
    },
    getStatusIcon: (status) => {
        switch (status) {
            case 'failed':
                return '<img src="files/icons/close.png" alt="Failed" class="status-icon failed" />';
            case 'skipped':
                return '<img src="files/icons/skip-right-line.svg" alt="Skipped" class="status-icon" style="filter: invert(1)" />';
            case 'interrupted':
                return '<img src="files/icons/pause-line.svg" alt="Interrupted" class="status-icon" style="filter: invert(1)" />';
            case 'flaky':
                return '<img src="files/icons/caution.png" alt="Flaky" class="status-icon" />';
            case 'passed':
            case 'success':
            default:
                return '<img src="files/icons/mark.png" alt="Success" class="status-icon" />';
        }
    },
    formatCode: (code) => code
        .replace(/\[39m/g, '</span>')
        .replace(/\[2m/g, '')
        .replace(/\[22m/g, '')
        // .replace(/\n/g, '<br>')
        .replace(/\[31m/g, '<span style="color: red;">')
        .replace(/\[32m/g, '<span style="color: green;">'),
    formatDuration: (duration) => {
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
    },
    createElement: (elem, options) => {
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
            if (options.html) {
                el.innerHTML = options.html;
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
    },
    createListItem: ({
        status, project, onclick, title, duration, location, element = 'li', mayExpand = false, children = [], details, pwLogo = false,
    }) => {
        const subList = reporter.createStepsList(children);
        const listItem = reporter.createElement(element, {
            onclick,
            className: `list-item${status ? '' : ' no-status'}${details ? ' expanded' : ''}${onclick === undefined ? ' no-cursor' : ''}${pwLogo ? ' pw-logo' : ''}`,
            children: [
                reporter.createElement('div', {
                    className: 'content',
                    children: [
                        mayExpand ? reporter.createElement('div', {
                            text: '▶',
                            className: `expand-icon${children.length > 0 || details ? '' : ' hidden'}`,
                            onclick: () => {
                                subList.classList.toggle('active');
                                listItem.classList.toggle('expanded');
                            },
                        }) : reporter.createElement('div', { className: 'hidden' }),
                        status ? reporter.createElement('div', {
                            className: 'status-icon',
                            html: reporter.getStatusIcon(status),
                        }) : reporter.createElement('div', { className: 'hidden' }),
                        reporter.createElement('div', {
                            className: `title${typeof title === 'string' ? '' : ' title-list'}`,
                            text: typeof title === 'string' ? title : undefined,
                            children: typeof title !== 'string' ? [title] : [],
                        }),
                        project ? reporter.createElement('div', {
                            className: `project ${project}`,
                            children: [
                                reporter.createElement('div', {
                                    className: 'inner',
                                    text: project,
                                }),
                            ],
                        }) : reporter.createElement('div', { className: 'project' }),
                        pwLogo ? reporter.createElement('div', {
                            className: 'pw-logo',
                            html: '<img src="files/icons/playwright-logo.svg" alt="Playwright Logo">',
                        }) : reporter.createElement('div', { className: 'pw-logo' }),
                        reporter.createElement('div', {
                            className: 'duration',
                            text: reporter.formatDuration(duration),
                        }),
                    ],
                }),
                location ? reporter.createElement('div', {
                    className: 'location',
                    text: `${location.file}:${location.line}`,
                }) : reporter.createElement('div'),
                details ? reporter.createElement('code', {
                    className: 'details',
                    html: details,
                }) : reporter.createElement('div'),
            ],
        });
        listItem.appendChild(subList);
        return listItem;
    },
    renderActivityDetails: (details) => details.map((detail, idx) => {
        const parts = [];
        if (idx > 0) {
            parts.push(reporter.createElement('div', { text: '.' }));
        }
        parts.push(reporter.createElement('div', { text: detail.methodName }));
        if (detail.parameters) {
            const paramList = [];
            Object.entries(detail.parameters || {}).forEach(([, value], innerIdx) => {
                if (innerIdx > 0) {
                    paramList.push(reporter.createElement('span', { text: ', ' }));
                }
                paramList.push(reporter.createElement('span', {
                    text: typeof value === 'object' || Array.isArray(value)
                        ? undefined
                        : typeof value === 'string' ? `"${value}"` : value,
                    children: typeof value === 'object' || Array.isArray(value)
                        ? [reporter.createElement('span', { className: 'tooltip', tooltip: JSON.stringify(value, undefined, 2), text: '▶ [object]' })]
                        : [],
                }));
            });
            parts.push(reporter.createElement('div', {
                children: [
                    reporter.createElement('span', { text: '(' }),
                    ...paramList,
                    reporter.createElement('span', { text: ')' }),
                ],
            }));
        }
        return reporter.createElement('div', { children: parts });
    }),
    createStepsList: (steps, isActive = false) => {
        const list = reporter.createElement('ul', {
            className: `steps-list${isActive ? ' active' : ''}`,
        });
        steps.forEach((step) => {
            const stepItem = reporter.createListItem({
                status: step.status ? step.status
                    // pwStep handling
                    : (step.error ? 'failed' : 'passed'),
                // project: execution.project,
                // onclick,
                title: step.title || reporter.createElement('div', {
                    className: 'wrapper',
                    children: [
                        reporter.createElement('div', {
                            className: 'actor',
                            text: step.actor,
                        }),
                        reporter.createElement('div', {
                            className: 'activity-action',
                            text: step.activityAction,
                        }),
                        reporter.createElement('div', {
                            className: 'activity-details',
                            children: reporter.renderActivityDetails(step.activityDetails),
                        }),
                    ],
                }),
                duration: step.duration,
                // suite: execution.suite,
                location: step.location,
                // filePath: step.filePath
                //     ? step.filePath
                //     : `${step.location.file.split('/').slice(-1)[0]}:${step.location.line}:${step.location.column}`,
                filePath: `${step.location.file}:${step.location.line}`,
                mayExpand: true,
                children: step.steps,
                details: step.error ? reporter.formatCode(step.error.stack) : undefined,
                pwLogo: step.category !== undefined,
            });
            list.appendChild(stepItem);
        });
        return list;
    },
    getExecutionTitle: (execution, asList = false) => {
        if (!asList) {
            return execution.titlePath.join(' › ');
        }
        return reporter.createElement('ul', {
            className: 'title-path',
            children: execution.titlePath.map((title) => reporter.createElement('li', {
                text: title,
            })),
        });
    },
    showExecutionDetails: (execution) => {
        const content = document.getElementById('flyin-content');
        content.innerHTML = '';
        content.appendChild(reporter.createListItem({
            element: 'div',
            // status: execution.status,
            project: execution.project,
            // onclick,
            title: reporter.getExecutionTitle(execution, true),
            // title: execution.titlePath.join("\n"),
            // duration: execution.duration,
            duration: execution.runs.reduce((acc, run) => acc + run.duration, 0),
            // suite: execution.suite,
            location: execution.location,
            // filePath: `${execution.suite}:${execution.location.line}`,
        }));
        const runDetails = reporter.createElement('div', { id: 'run-details' });
        const runList = reporter.createElement('ul', {
            className: 'run-list',
            children: execution.runs.map((run, runIdx) => reporter.createElement('li', {
                className: `run-list-item${runIdx === 0 ? ' active' : ''}`,
                html: `${reporter.getStatusIcon(run.status)} ${runIdx === 0 ? 'Run' : `Retry #${runIdx}`}`,
                onclick: () => {
                    document.querySelectorAll('.run-list-item').forEach((item) => item.classList.remove('active'));
                    document.querySelectorAll('#run-details > .steps-list').forEach((item) => item.classList.remove('active'));
                    document.querySelector(`.run-list-item:nth-child(${runIdx + 1})`).classList.add('active');
                    document.querySelector(`#run-details > .steps-list:nth-child(${runIdx + 1})`).classList.add('active');
                },
            })),
        });
        content.appendChild(runList);
        content.appendChild(runDetails);
        execution.runs.forEach((run, runIdx) => {
            const list = reporter.createStepsList(run.steps, runIdx === 0);
            runDetails.appendChild(list);
        });
        reporter.setFylinOpen(true);
    },
    renderExecutions: (executions) => {
        const report = document.getElementById('report');
        const list = reporter.createElement('ul');
        const groupedExecutions = new Map();
        executions.forEach((execution) => {
            if (groupedExecutions.has(execution.suite)) {
                groupedExecutions.get(execution.suite).push(execution);
            } else {
                groupedExecutions.set(execution.suite, [execution]);
            }
        });
        groupedExecutions.forEach((executions, suite) => {
            const item = reporter.createElement('li', {
                className: 'collapsible',
                children: [
                    reporter.createElement('header', {
                        onclick: () => {
                            item.classList.toggle('collapsed');
                        },
                        children: [
                            reporter.createElement('span', {
                                className: 'icon',
                                text: '▼',
                            }),
                            reporter.createElement('span', {
                                text: suite,
                            }),
                        ],
                    }),
                ],
            });
            const sublist = reporter.createElement('ul', {
                className: 'content',
            });
            executions.forEach((execution) => {
                const subitem = reporter.createListItem({
                    status: reporter.getExecutionStatus(execution),
                    project: execution.project,
                    onclick: ['skipped', 'interrupted'].includes(reporter.getExecutionStatus(execution)) ? undefined : () => reporter.showExecutionDetails(execution),
                    title: reporter.getExecutionTitle(execution),
                    // duration: execution.duration,
                    duration: execution.runs.reduce((acc, run) => acc + run.duration, 0),
                    // filePath: `${execution.suite}:${execution.location.line}`,
                    location: execution.location,
                });
                sublist.appendChild(subitem);
            });
            item.appendChild(sublist);
            list.appendChild(item);
        });
        report.innerHTML = '';
        report.append(list);
    },
    displayFiltered: (status) => {
        document.querySelector('.count-container.active').classList.remove('active');
        document.querySelector(`#${status}`).classList.add('active');
        const filteredExecutions = status === 'all'
            ? reporter.report.executions
            : reporter.report.executions.filter((execution) => reporter.getExecutionStatus(execution) === status);
        reporter.renderExecutions(filteredExecutions);
    },
    setFylinOpen: (open) => {
        const action = open ? 'remove' : 'add';
        document.getElementById('flyin').classList[action]('collapsed');
        document.getElementById('flyin-background').classList[action]('collapsed');
    },
    init: (report) => {
        reporter.report = report;
        reporter.showCount('all', 'all-count');
        reporter.showCount('passed', 'passed-count');
        reporter.showCount('failed', 'failed-count');
        reporter.showCount('flaky', 'flaky-count');
        reporter.showCount('skipped', 'skipped-count');
        reporter.showCount('interrupted', 'interrupted-count');
        reporter.displayFiltered('all');
    },
};

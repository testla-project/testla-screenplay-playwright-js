import { FullResult } from '@playwright/test/reporter';
import JsonReporter from './json';

const HTML_TEMPLATE = `<html>
    <head>
        <title>Screenplay Report</title>
        <style>
            body {
                background-color: #000;
                color: #c9d1d9;
            }
            #container {
                margin: 0 auto;
                max-width: 800px;
            }
            #status-bar {
                display: flex;
                border : 1px solid #30363d;
                border-radius: 5px;
                margin-bottom: 10px;
            }
            #status-bar div {
                flex: 1;
                padding: 2px 5px;
                text-align: center;
                border-right: 1px solid #30363d;
                cursor: pointer;
                font-size: 13px;
                align-items: center;
                display: flex;
                justify-content: center;
            }
            #status-bar div:last-child {
                border-right: none;
            }
            #status-bar div .count {
                display: inline-block;
                margin-left: 5px;
                padding: 2px 5px;
                border-radius: 7px;
                background-color: #30363d;
            }
            #status-bar div .icon {
                margin-right: 10px;
                display: inline-block;
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
        </style>
    </head>
    <body>
        <script>
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
        </script>
        <div id="container">
            <div id="status-bar">
                <div id="all" onClick="displayFiltered('all')">All<span class="count" id="all-count" /></div>
                <div id="passed" onClick="displayFiltered('passed')"><span class="icon"><script>document.write(getStatusIcon('passed'))</script></span>Passed<span class="count" id="passed-count" /></div>
                <div id="failed" onClick="displayFiltered('failed')"><span class="icon"><script>document.write(getStatusIcon('failed'))</script></span>Failed<span class="count" id="failed-count" /></div>
                <div id="skipped" onClick="displayFiltered('skipped')"><span class="icon"><script>document.write(getStatusIcon('skipped'))</script></span>Skipped<span class="count" id="skipped-count" /></div>
                <div id="interrupted" onClick="displayFiltered('interrupted')"><span class="icon"><script>document.write(getStatusIcon('interrupted'))</script></span>Interrupted<span class="count" id="interrupted-count" /></div>
            </div>
            <div id="report" />
        </div>
        <script>
            const report = /* JSON_REPORT */;
            const getCount = (status) => report.executions.filter((execution) => execution.status === status).length;
            const showCount = (status, element) => {
                const count = status === 'all' ? report.executions.length : getCount(status);
                const countElement = document.getElementById(element);
                countElement.innerText = count;
            }
            const renderExecutions = (executions) => {
                const report = document.getElementById('report');
                const list = document.createElement('ul');
                executions.forEach((execution) => {
                    const item = document.createElement('li');
                    item.innerText = getStatusIcon(execution.status) + ' ' + execution.title + ' (' + execution.duration + 'ms)';
                    list.appendChild(item);
                });
                report.innerHTML = '';
                report.append(list);
            };
            const displayFiltered = (status) => {
                const filteredExecutions = status === 'all' ? report.executions : report.executions.filter((execution) => execution.status === status);
                renderExecutions(filteredExecutions);
            }
            showCount('all', 'all-count');
            showCount('passed', 'passed-count');
            showCount('failed', 'failed-count');
            showCount('skipped', 'skipped-count');
            showCount('interrupted', 'interrupted-count');
            displayFiltered('all');
        </script>
    </body>
</html>`;

class HtmlReporter extends JsonReporter {
    constructor(config: any) {
        super(config);
        this.outputFile = `${config.configDir}/${config.outputFile || 'screenplay-report.html'}`;
    }

    onEnd(result: FullResult): void {
        const report = {
            ...result,
            executions: this.executions,
        };
        const fileContents = HTML_TEMPLATE.replace('/* JSON_REPORT */', JSON.stringify(report));
        this.write(fileContents);
    }
}

export default HtmlReporter;

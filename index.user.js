// ==UserScript==
// @name         Azure DevOps LucidChart viewer
// @namespace    http://elvenspellmaker.co.uk/
// @version      0.2
// @description  Converts aside blocks in a specific format into a LucidChart diagram.
// @author       Jack Blower <Jack@elvenspellmaker.co.uk>
// @match        https://dev.azure.com/*/*/_git/*
// @grant        none
// ==/UserScript==


window.addEventListener('load', lucidPreviewSetup);

const observer = new MutationObserver(lucidPreviewObserver);

function lucidPreviewSetup()
{
    'use strict';

    let pageContent = document.getElementsByClassName('page-content');

    if (! pageContent.length)
    {
        // console.log('no page content detected!');
        return;
    }

    pageContent = pageContent[0];

    // console.log(pageContent);

    const config = {
        childList: true,
        subtree: true,
    };

    observer.observe(pageContent, config);

    let markdownContent = pageContent.getElementsByClassName('markdown-content');

    if (! markdownContent.length)
    {
        // console.log('no markdown content detected!');
        return;
    }

    lucidPreview(markdownContent[0]);
};

function lucidPreviewObserver(mutationRecords, observer)
{
    'use strict';

    // console.log(mutationRecords);

    for(let mutation of mutationRecords)
    {
        for (let addedNode of mutation.addedNodes)
        {
            if (! addedNode.classList.contains('markdown-content'))
            {
                continue;
            }

            lucidPreview(addedNode);
        }
    }
};

function lucidPreview(node)
{
    'use strict';

    const regex = /id: ([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})(?:\nwidth: (\d+)\n(?:height: (\d+)))?/;

    let lucidElements = node.getElementsByClassName("lucidchart-userscript");

    // console.log(codeElements);

    for(let element of lucidElements)
    {
        let text = element.textContent;

        let matches = text.match(regex);

        if (matches.length)
        {
            let width = "640"
            let height = "480"
            if (matches.length > 2)
            {
                width = matches[2];
                height = matches[3];
            }

            let chartId = matches[1];

            element.innerHTML = `<div style="width: ${width}px; height: ${height}px; margin: 10px; position: relative;"><iframe allowfullscreen frameborder="0" style="width:${width}px; height:${height}px" src="https://app.lucidchart.com/documents/embeddedchart/${chartId}" id="chart-${chartId}"></iframe></div>`;
        }
    }
};

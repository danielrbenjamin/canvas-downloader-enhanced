// Function to create a download link for a single attachment
function createDownloadLink(element) {
    const file_id = element.className.match(/Attachment_(\d+)/)[1];
    const link_start = element.querySelector("a.ig-title.title.item_link").getAttribute("href").match(/^\/\w+\/\d+/)[0];
    return link_start + "/files/" + file_id + "/download?download_frd=1";
}

// Function to download multiple files
function downloadFiles(urls) {
    urls.forEach((url, index) => {
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = url;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, index * 1000); // Add 1 second delay between downloads to prevent browser issues
    });
}

// Add checkbox styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .file-checkbox-container {
        display: inline-block;
        margin-right: 10px;
    }
    .file-checkbox {
        margin: 0;
        vertical-align: middle;
    }
`;
document.head.appendChild(styleSheet);

// For all modules
document.querySelectorAll(".context_module").forEach(function(module) {
    // Find the module header items container
    const headerItems = module.querySelector(".module_header_items");
    if (!headerItems) return;

    // Create buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.style.display = "inline-block";
    
    // Create the "All" button with download icon
    const downloadAllBtn = document.createElement("button");
    downloadAllBtn.innerHTML = '<i class="icon-download"></i> All';
    downloadAllBtn.className = "btn btn-small module-download-all";
    downloadAllBtn.style.marginLeft = "10px";

    // Create the "Selected" button with download icon
    const downloadSelectedBtn = document.createElement("button");
    downloadSelectedBtn.innerHTML = '<i class="icon-download"></i> Selected';
    downloadSelectedBtn.className = "btn btn-small module-download-selected";
    downloadSelectedBtn.style.marginLeft = "10px";
    downloadSelectedBtn.disabled = true; // Initially disabled

    // Create the "Clear" button
    const clearBtn = document.createElement("button");
    clearBtn.innerHTML = '<i class="icon-end"></i> Clear';
    clearBtn.className = "btn btn-small module-clear-selected";
    clearBtn.style.marginLeft = "10px";
    clearBtn.style.display = "none"; // Initially hidden

    // Add click handler for Download All
    downloadAllBtn.addEventListener("click", function() {
        // Get all attachment links in this module
        const attachments = module.querySelectorAll("li.attachment.student-view");
        const downloadUrls = Array.from(attachments).map(createDownloadLink);
        
        if (downloadUrls.length > 0) {
            downloadFiles(downloadUrls);
        } else {
            alert("No downloadable files found in this module.");
        }
    });

    // Add click handler for Download Selected
    downloadSelectedBtn.addEventListener("click", function() {
        const selectedAttachments = module.querySelectorAll("li.attachment.student-view input.file-checkbox:checked");
        const downloadUrls = Array.from(selectedAttachments).map(checkbox => 
            createDownloadLink(checkbox.closest("li.attachment.student-view"))
        );
        
        if (downloadUrls.length > 0) {
            downloadFiles(downloadUrls);
        } else {
            alert("No files selected for download.");
        }
    });

    // Add click handler for Clear button
    clearBtn.addEventListener("click", function() {
        const checkboxes = module.querySelectorAll("input.file-checkbox:checked");
        checkboxes.forEach(checkbox => checkbox.checked = false);
        downloadSelectedBtn.disabled = true;
        clearBtn.style.display = "none";
    });

    // Add buttons to container and container to header items
    buttonsContainer.appendChild(downloadAllBtn);
    buttonsContainer.appendChild(downloadSelectedBtn);
    buttonsContainer.appendChild(clearBtn);
    headerItems.appendChild(buttonsContainer);

    // Add checkbox change event listener for the module
    module.addEventListener("change", function(e) {
        if (e.target.classList.contains("file-checkbox")) {
            const hasChecked = module.querySelector("input.file-checkbox:checked");
            downloadSelectedBtn.disabled = !hasChecked;
            clearBtn.style.display = hasChecked ? "inline-block" : "none";
        }
    });
});

// Add checkboxes and individual download buttons for each attachment
document.querySelectorAll("li.attachment.student-view").forEach(function(element) {
    const igRow = element.querySelector("div.ig-row.ig-published");
    
    // Create checkbox container
    const checkboxContainer = document.createElement("div");
    checkboxContainer.className = "file-checkbox-container";
    
    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "file-checkbox";
    checkboxContainer.appendChild(checkbox);
    
    // Create the download link element
    var newElement = document.createElement("a");
    // Give it the url of the relevant course and file
    newElement.href = createDownloadLink(element);
    // Give it the icon in the style of the Canvas icons
    newElement.innerHTML = '<span class="ig-type-icon" aria-hidden="true"><i class="icon-download"></i></span>';

    // Insert checkbox at the beginning of the row
    igRow.insertBefore(checkboxContainer, igRow.firstChild);
    // Append download icon
    igRow.appendChild(newElement);
});

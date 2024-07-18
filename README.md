# Smart Clipboard Extension

## Overview

The Smart Clipboard extension for Visual Studio Code provides commands to copy the file path and selected code to the clipboard as markdown. This is useful for note-taking apps such as Notion or Obsidian.. It offers two functionalities:
1. Copying the file path and the selected code as a link to open the code in VSCode.
2. Copying only the file path as a link to open the code in VSCode.

## Commands

- **Get Smart Code**: Copies the file path and selected code to the clipboard with a formatted link.
- **Get Smart Link**: Copies only the file path to the clipboard with a formatted link.

## Usage

1. **Copy File Path and Code**
   - Command: `smart-clipboard.getSmartCode`
   - This command copies the file path and selected code to the clipboard.

2. **Copy File Path Only**
   - Command: `smart-clipboard.getSmartLink`
   - This command copies only the file path to the clipboard.


## Configuration

You can configure the extension to use HTTPS redirection for the link.

- Open your VSCode settings.
- Search for smart clipboard
- Enable or disable the HTTPS Redirect

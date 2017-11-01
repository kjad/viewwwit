## NEXT

- Try to remove the PostParser class.
  - Idea: Each method in there should be moved to something else and then
    execute dispatches for updates on each post:
    - When content type is detected
    - When URL is determined
    - When content is loaded
    - When dimensions are determined
    - When valid / loading flags are changed

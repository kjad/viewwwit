## NEXT

- Need to create a PostContainer that will wrap the Post class, and communicate with the store
  - It will dispatch single update for that specific post

- Try to remove the PostParser class if possible.
  - Idea: Each method in there should be moved to the PostContainer and then execute dispatches for their updates:
    - When content type is detected
    - When URL is determined
    - When content is loaded
    - When dimensions are determined
    - When valid / loading flags are changed

VERTEX TOPSHEETS FOLDER
============================
Drop student topsheet PDFs/images here, then click
"Select Topsheets Folder & Sync" in the Admin Panel.

FILES ARE MATCHED IN TWO WAYS:
────────────────────────────────

1. BY ROLL NUMBER (preferred)
   Any 8+ digit number anywhere in the filename.
   Examples:
     11000225001.pdf
     11000225001_STUDENT_NAME.pdf
     STUDENT_NAME_11000225001.pdf
     topsheet_11000225001_final.pdf

2. BY STUDENT NAME (fallback)
   If no roll number is found, the filename is matched
   against student names in the database.
   Examples:
     RIFAH SONIA.pdf
     rifah_sonia.pdf
     Rifah_Sonia_topsheet.pdf
     AVILASH SINHA ROY.pdf

SUPPORTED FILE TYPES: .pdf, .png, .jpg, .jpeg

Once synced, files are permanently stored in the
browser's IndexedDB — they survive reload and close.
You only need to re-sync when adding NEW files.

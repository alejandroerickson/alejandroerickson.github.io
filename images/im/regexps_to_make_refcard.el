(progn
  (switch-to-buffer-other-window "aaronref.tex")
  (beginning-of-buffer)
  (replace-regexp "\\([{}%&$\\#]\\)"
		  "\\\\\\1")  
  (beginning-of-buffer)
  (replace-regexp "~"
		  "\\\\char`\\\\~")
;;do all of the short commands with short descriptions.
;;MODIFY THE LAST NUMBER IN THE REGEXP
  (beginning-of-buffer)
  (replace-regexp "^\s-*\\(.\\{0,9\\}\\)\s-*--\s-*\\(.\\{0,40\\}\\)?$"
		  "\\\\key{\\2}{\\1}")
;;do all of the short commands with long descriptions
  (beginning-of-buffer)
  (replace-regexp "^\s-*\\(.\\{0,9\\}\\)\s-*--\s-*\\(.*\\)?$"
		  "\\2\n\n\\\\key{}{\\1}")
  (beginning-of-buffer)
  (replace-regexp "^\s-*\\(.+?\\)\s-*--\s-*\\(.*\\)?$"
		  "\\\\metax{\\2}{\\1}")
  (beginning-of-buffer)
  (replace-regexp "^\s-*\\(.*\\):$"
		  "{\\\\headingfont \\1}\n")
  (beginning-of-buffer)
  (replace-regexp "\\\\HEADINGFONT"
		  "\\\\headingfont")

  (beginning-of-buffer)
;;MODIFY THE NUMBER IN THE REGEXP
  (while (search-forward-regexp "\\\\metax{.\\{54,\\}" nil t)
    (setq x (search-backward-regexp "^"))
    (setq y (search-forward-regexp "$"))
    (setq metastring (buffer-substring x y))
    (print (concat "buffer-substring:" metastring))
    (save-match-data
      (and	 (string-match "\\\\metax{\\(.*\\)??}{\\(.*\\)}" metastring)
		 (setq firststr (match-string 1 metastring)
		       secondstr (match-string 2 metastring) )))
    (print (concat "firststr" firststr))
    (print (concat "secondstr" secondstr))
    (delete-region x y)
    (insert firststr "\n\n\\metax{}{" secondstr "}")))

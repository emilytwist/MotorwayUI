
# Motorway UI Test



### 2. Performance

The API that is returning images is rather slow. Show how it can be sped up, and show how you would measure the improvement in performance.

Comment: Time to "first paint" measured using Network tab in Chrome Dev Tools - sped up with lazy loading & caching of images. I would suggest that images are stored in their original resolution as well as a separate copy being optimised on initial upload, to make a web-optimised version available for faster loading.


## Notes

The goal of the test is to prove your understanding of the concepts of modern HTML/CSS/JS, but not to produce something production ready or pixel perfect.
Your work will be tested in the browser of your choice, so please specify this when submitting. This can include pre-release browsers such as Chrome Canary or Safari Technology Preview if you want to work with experimental features.

Comment: Tested on Google Chrome, Version 98.0.4758.82 (Official Build) (64-bit)

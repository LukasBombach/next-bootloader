# Next Bootloader

Fine grained control over Next Js loading strategy including internal as well as third party assets that let you implement your critical rendering path.

Goals:

- [x] Precise and maintainable control over the order of requests
- [x] Browsers' Loading Piorities
- [x] Control over your app's assets as well as third party assets
- [x] React components for loading and inlining JS, CSS, Fonts & Images (and possibly others that I did not think of yet)
- [x] Feedback on the contents of the first HTTP frame

Stretch goals, but hard to implement

- [x] Critical CSS for your first viewport only
- [x] Critical JS for the things your really need before everything else

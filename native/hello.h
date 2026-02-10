#ifndef HELLO_H
#define HELLO_H

#include <napi.h>

// Exports C++ function to Node.js
Napi::String SayHello(const Napi::CallbackInfo& info);

// Exposes sayHello function
Napi::Object Init(Napi::Env env, Napi::Object exports);

#endif // HELLO_H
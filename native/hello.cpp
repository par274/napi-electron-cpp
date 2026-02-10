#include "hello.h"

// Exports C++ function to Node.js
Napi::String SayHello(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    return Napi::String::New(env, "Hello World from C++!");
}

// Exposes sayHello function
Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("sayHello", Napi::Function::New(env, SayHello));
    return exports;
}

// N-API module definition
NODE_API_MODULE(hello, Init);
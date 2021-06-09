import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions) {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktoYWxlZCBIYW16aSIsImFkbWluIjp0cnVlfQ.zP3HDCfpVcD3k2Kvp8ylXgUu-PAxv6nR9uqiog46Y_A';

    backend.connections.subscribe((connection: MockConnection) => {
        // Fake implementation of /api/authenticate
        if (connection.request.url.endsWith('/api/authenticate') &&
            connection.request.method === RequestMethod.Post) {
            let body = JSON.parse(connection.request.getBody());

            if (body.email === 'admin@domain.com' && body.password === 'password') {
              connection.mockRespond(new Response(
                new ResponseOptions({
                  status: 200,
                  body: { token: token }
                })
              ));
            } else {
              connection.mockRespond(new Response(
                new ResponseOptions({ status: 200 })
              ));
            }
        }

        // Fake implementation of /api/products
        if (connection.request.url.endsWith('/api/products') && connection.request.method === RequestMethod.Get) {
            if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
                connection.mockRespond(new Response(
                  new ResponseOptions({
                    status: 200, body: [
                      {
                        "id": 1,
                        "name": "Small Concrete Mouse",
                        "description": "Amet ipsam magni in consequatur quo. Ea tempora ratione aliquid voluptatem dolores ullam quod ut tempore. Accusantium non sed harum aut et vel voluptatem rerum et.",
                        "price": "772.00",
                        "imageUrl": "https://source.unsplash.com/1600x900/?product",
                        "quantity": 33398
                      },
                      {
                        "id": 2,
                        "name": "Tasty Plastic Gloves",
                        "description": "Delectus odit fuga minima sapiente quia occaecati reprehenderit. Qui perspiciatis facere quia vero ut aut. Sapiente provident sapiente rerum dicta culpa quaerat earum reiciendis sed.",
                        "price": "739.00",
                        "imageUrl": "https://source.unsplash.com/1600x900/?product",
                        "quantity": 10401
                      }
                    ] })
                ));
            } else {
                connection.mockRespond(new Response(
                    new ResponseOptions({ status: 401 })
                ));
            }
        }
    });
  
    return new Http(backend, options);
}

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};

/* eslint-disable quote-props */
// backend apis implementations

// const fetchDomain = 'localhost'

import config from './config.json';
const fetchDomain = config.BACKEND_URL;

// api base
const apiPost = (path, body) => {
  return new Promise((resolve, reject) => {
    fetch(`${fetchDomain}/${path}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
  });
};

const apiPostAuth = (path, token, body) => {
  return new Promise((resolve, reject) => {
    // fetch('http://' + fetchDomain + ':5005/' + path, {
    fetch(`${fetchDomain}/${path}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
  });
};

const apiGet = (path, queryString) => {
  return new Promise((resolve, reject) => {
    fetch('http://' + fetchDomain + ':5005/' + path + '?' + queryString, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
  });
};

const apiGetAuth = (path, token, queryString) => {
  return new Promise((resolve, reject) => {
    fetch('http://' + fetchDomain + ':5005/' + path + '?' + queryString, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
  });
};

const apiPutAuth = (path, token, body) => {
  return new Promise((resolve, reject) => {
    // fetch('http://' + fetchDomain + ':5005/' + path, {
    fetch(`${fetchDomain}/${path}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
  });
};

const apiDeleteAuth = (path, token) => {
  return new Promise((resolve, reject) => {
    fetch(`${fetchDomain}/${path}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response);
        }
      });
  });
};

// api calls
// POST /user/auth/register
export const authRegister = (email, password, name) => {
  return apiPost('user/auth/register', {
    email,
    password,
    name
  });
}

// POST /user/auth/login
export const authLogin = (email, password) => {
  return apiPost('user/auth/login', {
    email,
    password
  });
}

// POST /user/auth/logout
export const authLogout = (token) => {
  return apiPostAuth('user/auth/logout', token, {});
}

// GET /listings
export const listGet = () => {
  return apiGet('listings', '');
}

// POST /listings/new
export const listCreate = (token, title, address, price, thumbnail, metadata) => {
  return apiPostAuth('listings/new', token, {
    title,
    address,
    price,
    thumbnail,
    metadata
  });
}

// GET /listings/{listingId}
export const listDetail = (lid) => {
  return apiGet('listings/' + lid, '');
}

// PUT /listings/{listingId}
export const listUpdate = (token, lid, title, address, price, thumbnail, metadata) => {
  return apiPutAuth('listings/' + lid, token, {
    title,
    address,
    price,
    thumbnail,
    metadata
  });
}

// DELETE /listings/{listingId}
export const listDelete = (token, lid) => {
  return apiDeleteAuth('listings/' + lid, token);
}

// PUT /listings/publish/{listingId}
export const listPublish = (token, lid, available) => {
  return apiPutAuth('listings/publish/' + lid, token, {
    availability: available
  });
}

// PUT /listings/unpublish/{listingId}
export const listUnpublish = (token, lid) => {
  return apiPutAuth('listings/unpublish/' + lid, token, {});
}

// PUT /listings/{listingId}/review/{bookingId}
export const listReview = (token, lid, bid, review) => {
  return apiPutAuth('listings/' + lid + '/review/' + bid, token, {
    review
  });
}

// GET /bookings
export const bookGet = (token) => {
  return apiGetAuth('bookings', token, '');
}

// POST /bookings/new/{listingId}
export const bookCreate = (token, lid, date, fee) => {
  return apiPostAuth('bookings/new/' + lid, token, {
    dateRange: date,
    totalPrice: fee
  });
}

// PUT /bookings/accept/{bookingId}
export const bookAccept = (token, bid) => {
  return apiPutAuth('bookings/accept/' + bid, token, {});
}

// PUT /bookings/decline/{bookingId}
export const bookDecline = (token, bid) => {
  return apiPutAuth('bookings/decline/' + bid, token, {});
}

// DELETE /bookings/{bookingId}
export const bookDelete = (token, bid) => {
  return apiDeleteAuth('bookings/' + bid, token);
}

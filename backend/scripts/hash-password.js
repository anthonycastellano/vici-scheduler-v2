// Generate a bcrypt hash for the admin password.
// Usage: npm --prefix backend run hash-password -- <username> <password>
//
// Prints both forms of the hash because the two env loaders differ:
//   - backend/.env (dotenv, local dev)            -> use the plain hash
//   - repo-root .env (docker compose interpolation) -> use the $-escaped hash
// Copy the printed values into the file you are editing as ADMIN_USERNAME /
// ADMIN_PASSWORD_HASH.

const bcrypt = require('bcryptjs');

const [username, password] = process.argv.slice(2);

if (!username || !password) {
    console.error('Usage: npm --prefix backend run hash-password -- <username> <password>');
    process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);

console.log('# local dev — backend/.env (dotenv does not interpolate $):');
console.log(`ADMIN_USERNAME=${username}`);
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log('');
console.log('# production — repo-root .env (docker compose interpolates $, so it is escaped):');
console.log(`ADMIN_USERNAME=${username}`);
console.log(`ADMIN_PASSWORD_HASH=${hash.replace(/\$/g, '$$$$')}`);

# DNS Setup Guide for ivf-outcome-calculator.com

This guide covers configuring a custom domain with GitHub Pages using Squarespace Domains (formerly Google Domains).

---

## Prerequisites

- A GitHub repository with GitHub Pages enabled
- A `CNAME` file in the repository root containing `ivf-outcome-calculator.com`
- Access to your domain's DNS management panel on Squarespace Domains

---

## Step 1: Add A Records for the Apex Domain

These A records point the root domain (`ivf-outcome-calculator.com`) to GitHub Pages' servers.

1. Log in to [Squarespace Domains](https://domains.squarespace.com).
2. Select the domain `ivf-outcome-calculator.com`.
3. Navigate to **DNS** > **DNS Settings** > **Custom Records**.
4. Add four **A records** with the following values:

| Type | Host | Value             | TTL  |
|------|------|-------------------|------|
| A    | @    | 185.199.108.153   | 3600 |
| A    | @    | 185.199.109.153   | 3600 |
| A    | @    | 185.199.110.153   | 3600 |
| A    | @    | 185.199.111.153   | 3600 |

The `@` symbol represents the root domain. If the interface does not accept `@`, leave the Host field blank.

---

## Step 2: Add a CNAME Record for the www Subdomain

This record ensures that `www.ivf-outcome-calculator.com` also resolves to GitHub Pages.

| Type  | Host | Value                                    | TTL  |
|-------|------|------------------------------------------|------|
| CNAME | www  | <your-github-username>.github.io         | 3600 |

Replace `<your-github-username>` with your actual GitHub username. For example, if your GitHub username is `janedoe`, the value would be `janedoe.github.io`.

---

## Step 3: Verify the Domain in GitHub Pages Settings

1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Custom domain**, enter `ivf-outcome-calculator.com` and click **Save**.
4. GitHub will run a DNS check. If DNS has not fully propagated yet, you may see a warning -- this is normal and will resolve once propagation completes.
5. Once the DNS check passes, a green checkmark will appear next to the domain.

---

## Step 4: Enable HTTPS Enforcement

1. After the DNS check succeeds in the GitHub Pages settings, check the box labeled **Enforce HTTPS**.
2. If the checkbox is grayed out, wait a few minutes and refresh the page. GitHub needs time to provision an SSL certificate via Let's Encrypt.
3. Once enabled, all HTTP requests will be automatically redirected to HTTPS.

Note: HTTPS provisioning can take up to 24 hours in some cases, though it typically completes within 15-30 minutes.

---

## Step 5: Verify Everything is Working

Run the following checks to confirm the setup is complete:

### Check A records

```bash
dig ivf-outcome-calculator.com +short
```

Expected output (all four IPs):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Check CNAME record

```bash
dig www.ivf-outcome-calculator.com +short
```

Expected output:
```
<your-github-username>.github.io.
```

### Check HTTPS redirect

```bash
curl -I http://ivf-outcome-calculator.com
```

Expected: A `301` redirect to `https://ivf-outcome-calculator.com/`.

### Check the live site

Open [https://ivf-outcome-calculator.com](https://ivf-outcome-calculator.com) in a browser and verify the page loads with a valid SSL certificate (lock icon in the address bar).

---

## DNS Propagation Timeline

| Stage                        | Typical Time       | Maximum Time  |
|------------------------------|--------------------|---------------|
| A record propagation         | 5-30 minutes       | 48 hours      |
| CNAME record propagation     | 5-30 minutes       | 48 hours      |
| GitHub DNS verification      | 1-10 minutes       | 1 hour        |
| SSL certificate provisioning | 15-30 minutes      | 24 hours      |
| **Total (typical)**          | **30-60 minutes**  | **48 hours**  |

If propagation appears stalled after several hours, try:

1. Clearing your local DNS cache: `sudo dscacheutil -flushcache` (macOS) or `ipconfig /flushdns` (Windows).
2. Testing from a different network or using a DNS propagation checker such as [dnschecker.org](https://dnschecker.org).
3. Verifying that no conflicting DNS records exist (e.g., old A records or AAAA records pointing elsewhere).

---

## Troubleshooting

**"Domain does not resolve to the GitHub Pages server"**
- Confirm all four A records are correctly entered.
- Wait for DNS propagation to complete.

**HTTPS checkbox is grayed out**
- DNS must fully resolve before GitHub can provision the SSL certificate. Wait and try again.

**www subdomain returns a 404**
- Verify the CNAME record points to `<your-github-username>.github.io` (not the custom domain itself).
- Ensure the CNAME file in the repository contains only `ivf-outcome-calculator.com` (no `www.` prefix).

**Site loads but shows the wrong content**
- Confirm that GitHub Pages is set to deploy from the correct branch (usually `main`) and directory (usually root `/`).

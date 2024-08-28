# Use the official PHP image
FROM php:8.2-apache

# Copy source code to the /var/www/html directory in the container
COPY public/ /var/www/html/


# Expose port 80
EXPOSE 80
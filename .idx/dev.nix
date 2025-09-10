{ pkgs, ... }: {
  # channel = "stable-23.11"; # You can change the channel to use a different version of packages.

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.maven
    pkgs.jdk17
  ];

  # Sets environment variables in the workspace
  env = {};

  # Search for nix options here: https://devenv.sh/reference/options/
  previews = [
    {
      port = 8081;
      name = "API Gateway";
    }
    {
      port = 8761;
      name = "Eureka Server";
    }
    {
      port = 8080;
      name = "Frontend Service";
    }
    {
      port = 8082;
      name = "User Service";
    }
    {
      port = 8083;
      name = "Owner Service";
    }
    {
      port = 8084;
      name = "Notification Service";
    }
    {
      port = 8085;
      name = "Search Service";
    }
  ];
}
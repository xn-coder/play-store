{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.git
    pkgs.maven
    pkgs.jdk17
  ];
  # Sets environment variables in the workspace
  env = {};
  # Fast nix daemon for faster nix-shell times
  services.nix-daemon.enable = true;

  # The following longer example sets up a Spring Boot web server preview.
  #
  # For more details, see https://developers.google.com/idx/guides/previews
  previews = {
    enable = true;
    previews = {
      web = {
        # The command to run your app
        command = [ "mvn" "-pl" "api-gateway" "spring-boot:run" ];
        # The port your app listens on
        manager = "web";
        env = {
          PORT = "$PORT";
        };
      };
    };
  };
}

# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.jdk17 # Or a later version if preferred, e.g., pkgs.jdk21
    pkgs.gradle # For building Spring Boot applications
    # pkgs.maven # Uncomment if you prefer Maven over Gradle
  ];

  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "vscjava.vscode-java-pack" # Includes Language Support for Java, Debugger, Test Runner, etc.
      "Pivotal.vscode-boot-dev-pack" # Spring Boot Tools
    ];

    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Example: run your Spring Boot application with PORT set to IDX's defined port for previews,
          # and show it in IDX's web preview panel
          command = ["./gradlew" "bootRun"]; # Or ["mvn" "spring-boot:run"] if using Maven
          manager = "web";
          env = {
            # Environment variables to set for your server
            PORT = "$PORT";
          };
        };
      };
    };

    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: if your project has a Gradle wrapper, ensure it's executable
        make-gradlew-executable = "chmod +x gradlew || true"; # '|| true' to prevent failure if gradlew doesn't exist yet
        # Example: If you need to download Gradle dependencies initially
        # gradle-clean-build = "./gradlew clean build || true";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # You might not need specific onStart commands for Spring Boot unless you have
        # background tasks (e.g., specific watch tasks or database migrations).
      };
    };
  };
}
# .devcontainer/Dockerfile
ARG VARIANT="20-bullseye"
FROM mcr.microsoft.com/devcontainers/javascript-node:${VARIANT}

# Install Java (JDK)
RUN apt-get update && apt-get install -y default-jdk

# Install Android SDK Command Line Tools
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools
RUN mkdir -p $ANDROID_SDK_ROOT \
    && curl -o /tmp/sdk-tools.zip https://dl.google.com/android/repository/commandlinetools-linux-8583020_latest.zip \
    && unzip /tmp/sdk-tools.zip -d $ANDROID_SDK_ROOT/cmdline-tools \
    && rm /tmp/sdk-tools.zip \
    && yes | sdkmanager --licenses \
    && sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.0" # Adjust API level/build tools

# Set environment variables for Android
ENV JAVA_HOME=/usr/lib/jvm/default-java
ENV ANDROID_HOME=$ANDROID_SDK_ROOT

# Clean up apt cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
